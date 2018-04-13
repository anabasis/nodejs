var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'node',
  password:'1',
  database:'o2'
});
connection.connect();

connection.query('SELECT * FROM topic', (error, rows, fields) => {
    if(error) throw error;
    console.log('The Solution is : ', rows[0].title);
});

/*
READ
var sql = 'SELECT * FROM topic';
connection.query('SELECT * FROM topic', (error, rows, fields) => {
    if(error){
      console.log(error);
    }else{
      for(var i = 0 ; i < rows.length ; i++ ){
        console.log(rows[i].title);
      }
    }
});
*/

/*
CREATE
var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
var params = ['NodeJS 2222','NodeJS IS 2','JSCHO'];
connection.query(sql, params, (error, rows, fields) => {
    if(error){
      console.log(error);
    }else{
      console.log(rows);
    }
});
*/

/*
UPDATE
var sql = 'UPDATE topic SET title = ? , description = ?, author = ? WHERE id = ?';
var params = ['NodeJS 33','NodeJS IS 3','cho', 1];
connection.query(sql, params, (error, rows, fields) => {
    if(error){
      console.log(error);
    }else{
      console.log(rows);
    }
});
*/

/*
DELETE
var sql = 'DELETE FROM topic WHERE id = ?';
var params = [1];
connection.query(sql, params, (error, rows, fields) => {
    if(error){
      console.log(error);
    }else{
      console.log(rows);
    }
});
*/

connection.end();
