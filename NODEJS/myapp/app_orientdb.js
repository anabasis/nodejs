// 패키지 선언
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// 사용선언 및 설정
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;

// Database 설정
var OrientDB = require('orientjs');
var server = OrientDB({
  host:'localhost',
  port:2424,
  username:'root',
  password:'11111'
});
var db = server.use('o2');

// pug(구 jade) 선언
app.set('view engine', 'pug');
app.set('views', __dirname + '/view_orientdb');

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
app.get('/topic/add', (req,res) => {
  var sql = 'SELECT FROM topic';
  db.query(sql).then((topics) => {
    res.render("add",{topics:topics});
  });
});

// 신규생성 페이지 저장
app.post('/topic/add', (req,res) => {
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'INSERT INTO topic (title, description, author) VALUES ( :title, :description, :author)';
  db.query(sql,{
    params:{
      title:title,
      description:description,
      author:author
    }
  }).then((topics) => {
    res.redirect('/topic/'+encodeURIComponent(topics[0]['@rid']));
  });
});

// 내용변경 페이지
app.get('/topic/:id/edit', (req,res) => {
  var sql = 'SELECT FROM topic';
  var id = req.params.id;
  db.query(sql).then((topics) => {
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid:id}}).then((topic) => {
      res.render('edit',{topics:topics, topic:topic[0]});
    });
  });
});

// 내용변경 페이지 저장
app.post('/topic/:id/edit', (req,res) => {
  var sql = 'UPDATE topic SET title=:title , description=:description , author=:author  WHERE @rid=:rid';
  var id = req.params.id;
  db.query(sql,{
    params:{
      title:req.body.title,
      description:req.body.description,
      author:req.body.author,
      rid:req.params.id
    }
  }).then( (results) => {
    console.log(results);
    res.redirect('/topic/'+encodeURIComponent(id));
  });
});

// 목록 및 상세 정보
app.get(['/topic','/topic/:id'], (req,res) => {
  var sql = "SELECT FROM topic";
  db.query(sql).then((topics) => {
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    var id = req.params.id;
    if(id){
      db.query(sql, {params:{rid:id}}).then((topic) => {
        console.log(topic[0]);
        res.render('view',{topics:topics, topic:topic[0]});
      });
    } else {
      res.render('view', {topics:topics});
    }
  });
});

// 삭제 페이지
app.get('/topic/:id/delete', (req,res) => {
  var sql = 'SELECT FROM topic';
  var id = req.params.id;
  db.query(sql).then((topics) => {
    var sql = 'SELECT FROM topic WHERE @rid=:rid';
    db.query(sql, {params:{rid:id}}).then((topic) => {
      res.render('delete',{topics:topics, topic:topic[0]});
    });
  });
});

// 삭제처리 저장
app.post('/topic/:id/delete', (req,res) => {
  var sql = 'DELETE FROM topic WHERE @rid=:rid';
  var id = req.params.id;
  db.query(sql,{
    params:{
      rid:id
    }
  }).then( (results) => {
    console.log(results);
    res.redirect('/topic/');
  });
});

// 미들웨어 기동
app.listen(3000,(req,res) => {
  console.log('Connected listen on port 3000 !!!');
});
