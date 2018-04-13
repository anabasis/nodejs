// 패키지 선언
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// 사용선언 및 설정
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;

// pug(구 jade) 선언
app.set('view engine', 'pug');
app.set('views', __dirname + '/view_mysql');

// Database 설정
var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'node',
  password:'1',
  database:'o2'
});
conn.connect();

/* DATABASE BOARD PLAN
get('/topic/') : view.pug
get('/topic/:id') : view.pug
get('/topic/add') : add.pug
  post('/topic/add')
  get('/topic/:id')
get('/topic/:id/edit') : edit.pug
  post('/topic/:id/edit')
  get('/topic/:id')
get('/topic/:id') : delete.pug
  post('/topic/:id/delete')
  get('/topic/')
*/
// 신규생성 페이지
app.get('/topic/add', (req, res) => {
  var sql = 'SELECT * FROM topic';
  conn.query(sql, (error, topics, fields) => {
      if(error) throw error;
      res.render("add",{topics:topics});
  });
});

// 신규생성 페이지 저장
app.post('/topic/add', (req,res) => {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES ( ?, ?, ?)';
  var params = [title, description, author];
  conn.query(sql, params, (error, result, fields) => {
    // result = {fieldCount, affectedRows,insertId,serverStatus,warningCount,message,protocol41,changedRows}
    if(error) {
      console.log(error);
      throw error;
    }else {
      console.log('/topic/'+encodeURIComponent(result.insertId));
      res.redirect('/topic/'+encodeURIComponent(result.insertId));
    }
  });
});

// 내용변경 페이지
app.get('/topic/:id/edit', (req,res) => {
  var sql = 'SELECT * FROM topic';
  conn.query(sql, (error, topics, fields) => {
    var id = req.params.id;
    if(id){
      var sql = 'SELECT * FROM topic WHERE id= ? ';
      conn.query(sql, [id] ,(error,topic,fields) => {
        if(error) {
          console.log(error);
          throw error;
        }else {
          res.render('edit',{topics:topics, topic:topic[0]});
        }
      });
    }else{
      console.log(error);
      res.status(500).send('Custom Internal Server Error');
    }
  });
});

// 내용변경 페이지 저장
app.post('/topic/:id/edit', (req,res) => {
  var sql = 'UPDATE topic SET title= ? , description= ? , author= ?  WHERE id= ? ';
  var id = req.params.id;
  var params = [req.body.title, req.body.description, req.body.author, req.params.id ];
    conn.query(sql, params, (error, results, fields) => {
      res.redirect('/topic/'+encodeURIComponent(id));
    });
});

// 삭제 페이지
app.get('/topic/:id/delete', (req,res) => {
  var sql = 'SELECT * FROM topic';
  var id = req.params.id;
  if(id){
    conn.query(sql, (error, topics, fields) => {
      var sql = 'SELECT * FROM topic WHERE id= ? ';
      conn.query(sql, [id], (error, topic, fields) => {
        res.render('delete',{topics:topics, topic:topic[0]});
      });
    });
  }
});

// 목록 및 상세 정보
app.get(['/topic','/topic/:id'], (req,res) => {
  var sql = "SELECT * FROM topic";
  conn.query(sql, (error, topics ,fields) => {
    if(error){
      console.log(error);
      throw error;
    } else {
      var id = req.params.id;
      if(id){
        var params = [id];
        var sql = 'SELECT * FROM topic WHERE id= ? ';
        conn.query(sql, params, (error, topic, fields) => {
          res.render('view',{topics:topics, topic:topic[0]});
        });
      } else {
        console.log(topics);
        res.render('view', {topics:topics});
      }
    }
  });
});

// 삭제처리 저장
app.post('/topic/:id/delete', (req,res) => {
  var sql = 'DELETE FROM topic WHERE id= ? ';
  var id = req.params.id;
  conn.query(sql, [id], (error, results, fields) => {
    if(error){
      console.log(error);
      throw error;
    } else {
      console.log(results);
      res.redirect('/topic/');
    }
  });
});

//conn.end();

// 미들웨어 기동
app.listen(3000,(req,res) => {
  console.log('Connected listen on port 3000 !!!');
});
