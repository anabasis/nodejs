var express = require('express');
var app = express();

// POST 방식 전송 모듈 선언 및 사용
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// 세션 선언 및 사용
var session = require('express-session');
app.use(session({
  secret : 'keyboard cat',
  resave : false ,
  saveUninitialized : true
}));

app.get('/count', (req, res) => {
  if(req.session.count)
    req.session.count ++;
  else
    req.session.count = 1 ;
  res.send('count : ' + req.session.count);
});

app.get('/auth/login', (req, res) => {
  var output = `
  <form action="/auth/login" method="post">
    <p><input type="text" name="username" placeholder="username" ></p>
    <p><input type="password" name="password" placeholder="password" ></p>
    <p><input type="submit" ></p>
  </form>
  `;
  res.send(output);
});

app.post('/auth/login', (req, res) => {
  var user ={
    username : 'node',
    password : '11111',
    displayName : 'Node Master'
  };
  var uname = req.body.username;
  var pwd = req.body.password;
  if(uname === user.username && pwd === user.password){
    req.session.displayName = user.displayName;
    res.redirect('/welcome');
  }else{
    res.send('Who are you? <a href="/auth/login">login</a>');
  }
});

app.get('/welcome', (req,res) => {
  if(req.session.displayName){
    res.send(`
      <h1>Hello, ${req.session.displayName}</h1>
      <a href="/auth/logout">Logout</a>
      `);
  }else{
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
      `);
  }
  //res.send(JSON.stringify(req.session));
});

app.get('/auth/logout', (req, res) => {
  delete req.session.displayName;
  res.redirect('/welcome');
});

// 미들웨어 기동
app.listen(3000,(req,res) => {
  console.log('Cookie Connected listen on port 3000 !!!');
});
