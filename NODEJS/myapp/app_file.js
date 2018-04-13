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
app.set('views', __dirname + '/view_files');

// 신규생성 페이지
app.get('/topic/new', (req,res) => {
  fs.readdir( __dirname + '/data', (err, files) => {
    if(err){
      console.log(err);
      res.status(500).send('Custom Internal Server Error !!!!');
    }
    res.render("new",{topics:files});
  });
});

// 목록 페이지, 상세페이지
app.get(['/topic','/topic/:id'], (req,res) => {

  fs.readdir( __dirname + '/data', (err, files) => {
    if(err){
      console.log(err);
      res.status(500).send('Custom Internal Server Error !!!!');
    }
    var id = req.params.id;
    if(id){
      fs.readFile(__dirname + '/data/'+id, 'utf8', (err, data) => {
        if(err){
          console.log(err);
          res.status(500).send('Custom Internal Server Error !!!!');
        }
        //res.send(data);
        res.render('view', {topics:files, title:id, description:data });
      });
    }else{
      res.render('view', {topics:files, title:'Welcome', description:'Hello Javascript for Server'});
    }
  });
});

// 등록페이지
app.post('/topic', (req,res) => {
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile(__dirname + '/data/'+title, description, (err) => {
    if(err){
      console.log(err);
      res.status(500).send('Custom Internal Server Error');
    }
    res.redirect('/topic/'+title);
  });
});

// 미들웨어 기동
app.listen(3000,(req,res) => {
  console.log('Connected listen on port 3000 !!!');
});
