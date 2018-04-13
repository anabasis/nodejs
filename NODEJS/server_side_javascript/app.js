var express = require('express');
var app = express();

app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/form', (req,res) => {
  res.render('form');
});

app.get('/form_receiver', (req,res) => {
  console.log("GET 호출");
  var title = req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description + " GET");
});
app.post('/form_receiver', (req,res) => {
  console.log("POST 호출");
  var title = req.body.title;
  var description = req.body.description;
  res.send(title + ',' + description + " POST");
});

app.get('/topic/:id/:mode', (req,res) => {
  res.send(req.params.id+ ',' + req.params.mode);
});

app.get('/topic/:id/:mode', (req,res) => {
  res.send(req.params.id+ ',' + req.params.mode);
});

app.get('/topic/:id', (req,res) => {
  var topics = [
    'Javascript is ...',
    'NodeJS is ...',
    'Express is ...'
  ];
  var str = `
  <a href="/topic/0">Javascript</a><br>
  <a href="/topic/1">NodeJS</a><br>
  <a href="/topic/2">Express</a><br>
  `;
  var output = str + topics[req.query.id];
  res.send(output);
});

app.get('/param/:module_id/:topic_id', (req,res) => {
  res.json(req.params);
});

app.get('/template', (req,res) => {
  res.render('temp', {time:Date(),_title:'Jade 랜더링'});
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
