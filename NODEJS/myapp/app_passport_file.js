var express = require('express');
var app = express();

// POST 방식 전송 모듈 선언 및 사용
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// 세션 선언 및 사용(OrientDB저장)
var session = require('express-session');
var OrientoStore = require('connect-oriento')(session);
app.use(session({
  secret : 'keyboard cat',
  resave : false ,
  saveUninitialized : true,
  store : new OrientoStore({
    server:'host=localhost&port=2424&username=root&password=11111&db=o2'
  })
}));

// PASSPORT 선언
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// bkdf2 설정
var bkdf2Password = require("pbkdf2-password");

app.get('/count', (req, res) => {
  if(req.session.count)
    req.session.count ++;
  else
    req.session.count = 1 ;
  res.send('count : ' + req.session.count);
});

app.get('/auth/login', (req, res) => {
  var output = `
  <h1>Login</h1>
  <form action="/auth/login" method="post">
    <p><input type="text" name="username" placeholder="username" ></p>
    <p><input type="password" name="password" placeholder="password" ></p>
    <p><input type="submit" ></p>
  </form>
  `;
  res.send(output);
});

// 로그인 전략(LOCAL)
passport.user(new LocalStrategy(
  (username, password, dong) => {
    for(var i = 0 ; i < users.length ; i++){
        var user = users[i];
        if(username === user.username){
          return hasher( {password:password, salt : user.salt}, (error, pass, salt, hash) => {
            if(hash === user.password){
              //
            }else{
              //
            }
          });
        }
    }
  }
));

app.post('/auth/login', passport.authenticate(
    'local',  // 로컬전략
    {
      seccessRedirect:'/welcome',
      failureRedirect:'/auth/login',
      failureFlash: false  // 사용자에게 한번 메세지를 보여줌
    }
  )
);

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
