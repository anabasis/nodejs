var express = require('express');
var app = express();

// PRETTY 설정 production or developement
//if(app.get('env') === 'developement'){
    app.locals.pretty = true;
//}

// Template 설정
//express에게 template view engine을 알려주는 설정
app.set('view engine', 'jade');
//express에게 template 파일이 모여있는 디렉토리를 알려주는 설정
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/public'));
//app.use('/static', express.static(__dirname + '/public'));

// Template 랜더링
app.get('/template', (req,res) => {
  //res.render('temp');  // temp.jade랜더링
  res.render('temp', {time:Date(), _title:'Jade 랜더링'});  // 파라메터 전달
});

app.get('/dynamic', (req,res) => {
  var lis = '';
  for(var i = 0 ; i < 5 ; i++){
    lis = lis + '<li>coding</li>';
  }
  var time = Date();

  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Dynamic Hello, Static !!
      <ul>
      ${lis}
      </ul>
      ${time}
    </body>
  </html>
  `;
  res.send(output);
});

app.get('/route', (req,res) => {
    res.send('Hello Router, <img src="/Periodic-Table.png">');
});

app.get('/', (req, res) => {
  res.send('Arrow Hello World!');
});

app.get('/login', (req, res) => {
  res.send('Arrow Hello World! Login');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

/*
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
*/
