
var Schema = {};

Schema.createSchema = function(mongoose) {
  console.log("call Create Schema in tx_schema");

  var blockSchema = mongoose.Schema({
    blockNumber : {type : Number, 'default' : -1, unique : true},
    hash : {type : String, 'default' : ''},
    age : {type :Date, 'default' : -1},
    txNumber : {type : Number, 'default' : 0},
    uncleCount : {type: Number, 'default' : -1},
    miner : {type : String, 'default' : ''},
    gasLimit : {type : Number, 'default' : ''},
    difficulty : {type : Number, 'default' : 0},
    gasSpending : {type : Number, 'default' : 0}
});

  var container_Schema = mongoose.Schema({
       startNumber : {type : Number, 'default' : -1, unique: true},
       blockList : {type : [blockSchema], 'default' : ''},
  });

  return container_Schema;
};

module.exports = Schema;
