var Schema = {};

Schema.createSchema = function(mongoose) {
  console.log("call Create Schema in statistics_schema");
  var statSchema = mongoose.Schema({
       date : {type : Date, 'default' : -1, unique : true},
       totalMakeBlock : {type : Number, 'default' : 1},
       avgDifficulty : {type : Number, 'default' : -1},
       avgBlockTime : {type : Number, 'default' : -1},
       avgGasLimit : {type : Number, 'default' : -1},
       avgGasSpending : {type: Number, 'default' : -1},
       totalUncleCount : {type : Number, 'default' : -1},
       minBlockNumber : {type : Number, 'default' : -1},
       maxBlockNumber : {type : Number, 'default' : -1}
  });

  return statSchema;
};

module.exports = Schema;