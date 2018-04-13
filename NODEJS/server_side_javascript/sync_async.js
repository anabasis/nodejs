var fs = require('fs');

// Sync
console.log(1);
var data = fs.readFileSync(__dirname+'/input.txt',{encoding:'utf8'});
console.log(data);

// Async
console.log(2);
var data = fs.readFile(__dirname+'/input.txt',{encoding:'utf8'}, function(err,data){
  console.log(3);
  console.log(data);
});
console.log(4);

// Async + Arrow
console.log(5);
var data = fs.readFile(__dirname+'/input.txt',{encoding:'utf8'}, (err,data) => {
  console.log(6);
  console.log(data);
});
console.log(7);
