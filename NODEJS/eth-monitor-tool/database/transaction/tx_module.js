var database;
var txSchema;
var TxModel;

var init = function(db) {
  console.log("set database to tx module");

  database = db;
  txSchema = db.txSchema;
  TxModel = db.txModel;
 // console.log('DB'  + database + 'DB Schema : ' + txSchema +  'DB Model : '  +  txModel);
};
var insertTransactiononDB = function(txinfos, callback) {
 // console.log(txlist);

  var blockNumber = txinfos.tx[0].blockNumber;
  var time = txinfos.time;

  for(var i =0; i < txinfos.tx.length; i++)
  {
    var txinfo = txinfos.tx[i];
    console.log('data saved in tx on DB : ' + txinfo.blockNumber);

    var txdata = new TxModel(
      { blockNumber : blockNumber,
        txHash : txinfo.hash,
        from : txinfo.from,
        age : (time + 32400) * 1000 , // for kor gmt
        value : txinfo.value,
        to : txinfo.to,
        gasSpend : txinfo.gas,
        gasPrice : txinfo.gasPrice });
        txdata.save(function(err, result) {
          if(err)
          {
            callback(err, null);
          }
        });
  }

};

var SetTxNumber = function(callback){
    TxModel.find({},(err, result) => {
      if(err)
      callback(null, 0);
      return ;
    }); //init
    TxModel.find({}).sort('-txNumber').limit(1).exec(function(err, docs) {
      if(err)
        console.log("xxxx");
      if(docs.length == 0){
        callback(null, 0);
        console.log("xxxy");
        return ;
      }
         //for init
      //  console.log('docs : ', docs[0].txNumber);
        callback(null, docs[0].txNumber);
     });
};

var GetTransactiononDB = function(count, callback) {
  TxModel.find({"txNumber": {"$lte" : count}}, (err, result) => {
    if(err) {
      callback(err, null);
    }
    else{
      console.log(result);
      for( var i = 0; i < count; i++)
        if(result[i].to == null)
          result[i].to = 'null';
      callback(null, result);
    }
  });
};

var GetMaxTxNumber = function() {
  return TxModel.count({}, function(err, c) {
    console.log("Total Transaction : " + c);
  });
};


module.exports.SetTxNumber = SetTxNumber;
module.exports.init = init;
module.exports.insertTransactiononDB = insertTransactiononDB;
module.exports.GetTransactiononDB = GetTransactiononDB;
module.exports.GetMaxTxNumber = GetMaxTxNumber;
