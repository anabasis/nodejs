var database;
var ContainerSchema;
var ContainerModel;
var BlockSchema = require('../blockconainer/container_schema');
var BlockModel;

var init = function(db) {
  console.log("set database to tx module");

  database = db;
  ContainerSchema = db.containerSchema;
  ContainerModel = db.containerModel;
  BlockModel = db.blockModel;
 // console.log('DB'  + database + 'DB Schema : ' + txSchema +  'DB Model : '  +  txModel);
};
var insertBlockList = function(blockList, date, callback) {

  var blockContainer = new ContainerModel({
    startNumber: blockList[0].blockNumber,
    blockList: blockList,
  });

  blockContainer.save(function(err) {
  if(err)
  {
    callback(err);
  }
});

};

var GetBlockListOnDB = function(startNumber, endNumber, callback) {

  var prevContainerNum = startNumber / 100;
  var ContainerNum = endNumber / 100;

  var countContainer = ContainerNum - prevContainerNum;

    containerModel.find({"startNumber" : {"$lte" : ContainerNum * 100, "$gte" : prevContainerNum * 100}},
    (err, results) =>
    {
      if(err)
        callback(err, null);
      else{
        var startIndex = (startNumber % 100) -1;
        var endIndex = (endNumber % 100) -1;
        var arraySize = results.length;


        if(arraySize == 1)
        {
          var array = results[0].blockList.slice(startIndex, endIndex);
          callback(null, array);
        }
        else{
          var array = results[0].blockList.slice(startIndex, 99);
          for(var i = 1; i < arraySize - 1; i++)
          {
            array.concat(results[i].blockList);
          }
          array.concat(results[arraySize -1].blockList.slice(0, endIndex));

          callback(null, array);
        }
      }
   });
};

var SetBlockListOnDB = function(blocklist, callback)
{

}
var ResetMissingBlock = function(callback) {
  MissingBlockModel.remove({}, (err) => {
    if(err)
      callback(err, null);
  });
};



module.exports.insertMissingBlockOnDB = insertMissingBlockOnDB;
