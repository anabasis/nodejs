var database;
var blockSchema;
var BlockModel;
var blockNumberlist;
var today;
var dt = new Date();

var init = function(db) {
  console.log("set database to block module");

  var month = dt.getMonth();
  var day = dt.getDay();
  console.log("Today Month : " + month + ", day : " + day);
  database = db;
  blockSchema = db.blockSchema;
  BlockModel = db.blockModel;
 // console.log('DB'  + database + 'DB Schema : ' + blockSchema +  'DB Model : '  +  BlockModel);
};


var insertHistoryonDB = function(blocklist, callback) {

  var minHeight = blocklist[0].number;
  var maxHeight = blocklist[blocklist.length -1].number;
  var saveCount = 0;
  var curTime = new Date().getTime();
  var preBlockTimestamp = 0;
  var preDate = 0;
  var preMonth = 0;

  var preDBDate;

  var preDBDate;
  var _idArray = [];

  for(var i = 0 ;i < blocklist.length; i++)
  {
    var block = blocklist[i];
    console.log('Data saved in blocks on DB : ' + block.number);
    var blockdata = new BlockModel(
    {
        _id : block.number,
        blockNumber : block.number,
        hash : block.hash,
        date: 0,
        age : (block.timestamp  + 32400) * 1000, // for gmt(+ 9 hours)
        timeGap : block.timestamp - preBlockTimestamp,
        txNumber : block.transactions.length,
        miner : block.miner,
        gasLimit : block.gasLimit,
        difficulty : block.difficulty,
        gasSpending : block.gasUsed,
        uncleCount : block.uncles.length
      });


    var newTime = new Date(blockdata.age);
    var newMonth = newTime.getMonth();
    var newDate = newTime.getDate();


    if((newDate - preDate) != 0 && (newMonth - preMonth) != 0)
    {
      if(_idArray.length != 0)
      {
        console.log("excute aggregate!!!!!!");
        BlockModel.aggregate([{"$match" : { "date" : preDBDate } }, {"$group" :
        { "_id" : preDBDate, "timeAvg" : {"$avg" : "$timeGap"},
      "difficultyAvg" : { "$avg" : "$difficulty"}, "txNumberAvg" : {"$avg" : "$txNumber"} }}],
      function(err, result) {
        console.log(result);
      });
      }
      _idArray = [];
      preDBDate = (new Date(newTime.getFullYear(), newMonth, newDate ,9,0,0,0)).getTime();
    }

    blockdata.save(function(err, result) {
      if(err)
      {
        callback(err, null);
      }
    });

    _idArray.push(blockdata._id);
    blockdata.date = preDBDate;


    preMonth = newMonth;
    preDate = newDate;
    preBlockTimestamp = block.timestamp;

  }

  callback(null, {
    minBlock: minHeight,
    maxBlock: maxHeight,
    savedCount: saveCount,
  });

};

var GetHistoryDB = function(startIndex, count, callback) {
  console.log('startIndex : ' + startIndex + ', count : ' + count);
  var endIndex = startIndex - count;
  BlockModel.find({"blockNumber": {"$lte" : startIndex, "$gte" : endIndex}}, (err, result) => {
    if(err) {
      callback(err, null);
    }
    else
      callback(null, result);
  });
};

var SetBlockonDB = function(data, callback){
  blockdata = new BlockModel(
    {
      blockNumber : data.number,
        hash : data.hash,
        age : (data.timestamp  + 32400) * 1000, // for gmt(+ 9 hours)
        txNumber : data.transactions.length,
        miner : data.miner,
        gasLimit : data.gasLimit,
        difficulty : data.difficulty,
        gasSpending : data.gasUsed,
        uncleCount : data.uncles.length
    });
  blockdata.save(function(err, result){
    if(err)
    {
      callback(err, null);
    }
  });
};

var GetBlockonDB = function(data, callback) {
  BlockModel.find({"blockNumber" : data },(err, result) => {
    if(err){
      callback(err, null);
    }
    else
      callback(null, result[0]);
  });
};

var FindLatestBlockonDB = function(callback) {
  BlockModel.find({},(err,result) =>{
    if(err)
    {
      callback(err, null);
    }
   });
};

var GetMaxBlockNumber = function() {
  return BlockModel.find({}).sort({blockNumber : -1}).limit(1).blockNumber;
};
var GetMinBlockNumber = function() {
  return BlockModel.sort({blockNumber : 1}).limit(1).blockNumber;
};

module.exports.FindLatestBlockonDB = FindLatestBlockonDB;
module.exports.SetBlockonDB = SetBlockonDB;
module.exports.GetBlockonDB = GetBlockonDB;
module.exports.init = init;
module.exports.insertHistoryonDB = insertHistoryonDB;
module.exports.GetHistoryDB = GetHistoryDB;
module.exports.GetMaxBlockNumber = GetMaxBlockNumber;
module.exports.GetMinBlockNumber = GetMinBlockNumber;


