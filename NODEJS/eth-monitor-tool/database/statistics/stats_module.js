var database;
var statsSchema;
var StatsModel;
var BlockModel;

var init = function(db) {
  console.log("set database to statistics module");

  database = db;
  statsSchema = db.statsSchema;
  StatsModel = db.statsModel;
  BlockModel = db.blockModel;
};

var insertStatsonDB = function(callback){

    var statslist = new StatsModel({  //init new date's statistics
        date : data.date,
        totalMakeBlock : data.totalMakeBlock,
        avgDifficulty : data.difficulty ,
        avgBlockTime : data.blockTime, // need timestamp prev !!!
        avgGasLimit : data.gasLimit,
        avgGasSpending : data.gasSpending,
        totalUncleCount : data.uncleCount,
        minBlockNumber : data.blockNumber,
        maxBlockNumber : data.blockNumber
    });

    statslist.save(function(err) {
        if(err)
        {
            callback(err);
        }
      });
};

var updateStatsOnDB = function(data,callback){ //data : new datas
    StatsModel.find({date : data.date},(err,result)=>{
        var existstats = result[0];
        console.log("existstats : ", existstats);
        console.log("data : ", data);
        if(existstats.minBlockNumber > data.blockNumber || existstats.maxBlockNumber < data.blockNumber ) //double check
        {   //existstats.date
            existstats.avgDifficulty = (existstats.avgDifficulty * existstats.totalMakeBlock + data.difficulty) / (existstats.totalMakeBlock + 1);
            console.log(existstats.avgDifficulty);
            existstats.avgBlockTime =  (existstats.avgBlockTime * existstats.totalMakeBlock + data.blockTime) / (existstats.totalMakeBlock + 1);
            existstats.avgGasLimit = (existstats.avgGasLimit * existstats.totalMakeBlock + data.gasLimit) / (existstats.totalMakeBlock + 1);
            existstats.avgGasSpending = (existstats.avgGasSpending * existstats.totalMakeBlock + data.gasSpending) / (existstats.totalMakeBlock + 1);
            existstats.totalUncleCount = (existstats.totalUncleCount * existstats.totalMakeBlock + data.uncleCount) / (existstats.totalMakeBlock + 1);
            if(existstats.minBlockNumber > data.blockNumber)    existstats.minBlockNumber = data.blockNumber;
            if(existstats.maxBlockNumber < data.blockNumber)    existstats.maxBlockNumber = data.blockNumber;
            existstats.totalMakeBlock++;
            console.log("success" , existstats);
            StatsModel.findOneAndUpdate({'date' : data.date}, existstats,function(err, doc){
                if(err) return err;
                return callback(null, doc);
            });
        }
    });
};

module.exports.init = init;
module.exports.updateStatsOnDB = updateStatsOnDB;
module.exports.insertStatsonDB = insertStatsonDB;
