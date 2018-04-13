// 동기예제
console.log(__dirname);
var fs = require("fs");
var data = fs.readFileSync(__dirname+'/input.txt');
console.log(data.toString());
console.log("Program has ended");
