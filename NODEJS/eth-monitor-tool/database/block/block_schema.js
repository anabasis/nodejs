
var Schema = {};

Schema.createSchema = function(mongoose) {
  console.log("call Create Schema in block_schema");
  var blockSchema = mongoose.Schema({
       _id : { type: Number, require: true },
       blockNumber : {type : Number, 'default' : -1, unique : true},
       hash : {type : String, 'default' : ''},
       date : {type : Number, 'default' : -1},
       age : {type :Date, 'default' : -1},
       timeGap : {type : Number, 'default' : -1},
       txNumber : {type : Number, 'default' : 0},
       uncleCount : {type: Number, 'default' : -1},
       miner : {type : String, 'default' : ''},
       gasLimit : {type : Number, 'default' : ''},
       difficulty : {type : Number, 'default' : 0},
       gasSpending : {type : Number, 'default' : 0}
  });

  blockSchema.static('findBlockList', function(startIndex, count, callback) {
    var endIndex = startIndex - count -1;
    if(endIndex == 0)
      endIndex = 0;
    return this.find({blockNumber : {$lte: startIndex, $gte: endIndex}});
  });

  return blockSchema;
};

module.exports = Schema;




