
var Schema = {};

Schema.createSchema = function(mongoose) {
  console.log("call Create Schema in tx_schema");
  var txSchema = mongoose.Schema({
       blockNumber : {type : Number, 'default' : -1},
       txHash : {type : String, 'default' : '', unique : true},
       from : {type : String, 'default' : ''},
       age : {type :Date, 'default' : -1},
       value : {type: Number, 'default' : -1},
       to :     {type : String, 'default' : ''},
       gasSpend : {type : Number, 'default' : ''},
       gasPrice : {type : Number, 'default' : ''}
  });

  txSchema.static('findtxList', function(startIndex, count, callback) {
    var endIndex = startIndex - count -1;
    if(endIndex == 0)
      endIndex = 0;
    return this.find({txNumber : {$lte: startIndex, $gte: endIndex}});
  });


  return txSchema;
};

module.exports = Schema;
