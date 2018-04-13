var OrientDB = require('orientjs');

var server = OrientDB({
  host:'localhost',
  port:2424,
  username:'root',
  password:'11111'
});

var db = server.use('o2');

/*
db.record.get('#20:0')
.then((record) =>{
  console.log('Loaded Record', record);
});
*/

var sql = 'SELECT FROM topic';
//db.query(sql).then(function(results){  ... });
db.query(sql).then( (results) => {
  console.log(results);
});
/* READ
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
  params:{
    rid:'#20:0'
  }
};
//db.query(sql).then(function(results){  ... });
db.query(sql,param).then( (results) => {
  console.log(results);
});
*/

/*
CREATE
var sql = 'INSERT INTO topic (title, description) VALUES (:title, :desc)';
//db.query(sql, param).then(function(results){  ... });
db.query(sql,{
  params:{
    title:'Express',
    desc:'Express is Express(Framework for web)'
  }
}).then( (results) => {
  console.log(results);
});
*/

/*
UPDATE 결과 : [ '1' ]
var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
//db.query(sql, param).then(function(results){  ... });
db.query(sql,{
  params:{
    title:'Express UPDATE',
    rid:'#21:0'
  }
}).then( (results) => {
  console.log(results);
});
*/

/*
DELETE 결과 : [ '1' ]
var sql = 'DELETE FROM topic WHERE @rid=:rid';
//db.query(sql, param).then(function(results){  ... });
db.query(sql,{ params:{ rid:'#18:0' } }).then( (results) => {
  console.log(results);
});
*/
