
var _ = require("lodash");
var logger = require("./lib/utils/logger"); //ws_secret 관련
var chalk = require("chalk");

var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var path = require("path");
var app = express();
var Primus = require("primus");
var io = require("socket.io");
var isInitialized = false;
var isDBInitilized = false;

var database = require('./database/db');
var config = require('./config/config');
var api;
var blockmodule = require('./database/block/block_module');
var txmodule = require('./database/transaction/tx_module');
var statmodule = require('./database/statistics/stats_module');
// var socket;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, "dist"))); // dist-lite가 필요없어서 그대로

//app.use( '/api' , api );
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

var port = process.env.PORT || 3000;
app.set("port", port);

//서버 생성
var server = http.createServer(app);
console.log("I'm Listening....");
var client = new io(server);


api = new Primus(server, {
  transformer: "websockets",
  pathname: "/api",
  parser: "JSON"
});
//console.log(' got API');
api.plugin("emit", require("primus-emit"));
api.plugin("spark-latency", require("primus-spark-latency"));

// Client 소켓 설정
// client = new Primus(server, {
// 	transformer: 'websockets',
// 	pathname: '/primus',
// 	parser: 'JSON'
// });

// 외부 소켓 설정 - collection
external = new Primus(server, {
  transformer: "websockets",
  pathname: "/external",
  parser: "JSON"
});

external.plugin("emit", require("primus-emit"));

// collection 노드 생성
var Collection = require("./lib/collection");
var Nodes = new Collection(external);

//노드의 차트콜백  > 클라이언트에 차트그려줌. 나바쁘니까 좀 알아서그려봐
Nodes.setChartsCallback(function(err, charts) {
  if (err !== null) {
    console.error("COL", "CHR", "Charts error:", err);
  } else {
    client.emit("charts", charts);
  }
});
//API와의 연동 시작
api.on("connection", function(spark) {
  console.log("Hello! Connected with API!");
  console.info("API", "CON", "Open:", spark.address.ip);

  spark.on("hello", function(data) {
    console.info("API", "CON", "Hello", data.id);

    if (!_.isUndefined(data.id) && !_.isUndefined(data.info)) {
      data.ip = spark.address.ip;
      data.spark = spark.id;
      data.latency = spark.latency || 0;

      var blockNumber = data.blockNumber;
      console.log('last block number : ' + blockNumber);
      Nodes.add(data, function(err, info) {
        if (err !== null) {
          console.error("API", "CON", "Connection error:", err);
          return false;
        }

        // Initilize DB when start monitor tool
        if (info !== null && isInitialized === false && isDBInitilized === false) { // blockNumber
          var range  = Nodes.getHistory().getMissingBlockList(blockNumber);
          var wholelist = Nodes.getHistory().getWholeHistory(blockNumber);

          spark.emit("ready", range, wholelist);
          console.success("API", "CON", "Connected", data.id);
          console.log(info.info); // get infos
          client.emit("add", info);

        }
      });
    }
  });

   spark.on("blocknumber", function(data) {
    Nodes.setTotalBlockNumber(data);
  });

  spark.on("block", function(data) {

    if(isInitialized === false)
    {
      return;
    }
    if (!_.isUndefined(data.id) && !_.isUndefined(data.block)) {

      Nodes.getHistory().SetNewBlock(data.block);
      var range = Nodes.getHistory().getMissingBlockList(data.block.number);
      console.log('history request : ' + range.list);
      spark.emit("history", range);
      client.emit("block", data);
    }
  });


  spark.on("pending", function(data) {
    if (!_.isUndefined(data.id) && !_.isUndefined(data.stats)) {
      //console.log('pendingTx : ' + data.stats.pending[0].hash + ' count  :' + data.count);

      var pendings  =[];
      for(var i = 0 ; i < data.count; i++)
      {
        var ele = {
          'Result' : 'false',
          'TxHash' : data.stats.pending[i].hash,
          'Age' : 1,
          'From' : data.stats.pending[i].from.substring(0, 5),
          'To' : data.stats.pending[i].to.substring(0, 5),
          'Value' : data.stats.pending[i].value,
          'Gas' : data.stats.pending[i].gas,
        };

        pendings.push(ele);
      }
      client.emit('pendingTx', {Pending: pendings,
      count: data.count});

      Nodes.updatePending(data.id, data.count, function(err, stats) {
        if (err !== null) {
          console.error("API", "TXS", "Pending error:", err);
        }

        if (stats !== null) {
          console.log("pending : ", stats);
          console.log("pending end");


          console.success(
            "API",
            "TXS",
            "Pending:",
            data.stats.pending,
            "from:",
            data.id
          );
        }
      });
    } else {
      console.error("API", "TXS", "Pending error:", data);
    }
  });

  spark.on("stats", function(data) {
    if (!_.isUndefined(data.id) && !_.isUndefined(data.stats)) {
      Nodes.updateStats(data.id, data.stats, function(err, stats) {
        if (err !== null) {
          console.error("API", "STA", "Stats error:", err);
        } else {
          if (stats !== null) {
            // console.log('stats : ',stats);
            // console.log('stats end');
            client.emit("stats", stats); //clinet에게 적어주지

            console.success("API", "STA", "Stats from:", data.id);
          }
        }
      });
    } else {
      console.error("API", "STA", "Stats error:", data);
    }
  });

  spark.on("update", function(data) {
    if (!_.isUndefined(data.id) && !_.isUndefined(data.stats)) {
      Nodes.update(data.id, data.stats, function(err, stats) {
        if (err !== null) {
          console.error("API", "UPD", "Update error:", err);
        } else {
          if (stats !== null) {
            console.log("update : ", stats);
            console.log("update end");
            console.info("API", "UPD", "Update from:", data.id, "for:", stats);

            Nodes.getCharts();
          }
        }
      });
    } else {
      console.error("API", "UPD", "Update error:", data);
    }
  });

  spark.on("wholeHistory", function(data){ // Save datas on DB
    console.success("API", "HIS", "Got whole history form : ", data.id);
    console.log("listen wholeHistory : " + data);
    blockmodule.insertHistoryonDB(data.history, (err, result) => {
      if(err)
        console.log("Error occure during insert db data  : " + err);
    });


    console.log('DB Initialize Complete ' + data.history.length);
    isDBInitilized = true;

  });

  spark.on("transactions", function(data) {
    console.log("listen transactions : " + data.tx[0].blockNumber);
    txmodule.insertTransactiononDB(data, (err, result) => {
      if(err)
        console.log("Error ocuur during intser tx data to db : " + err);
    });


  });

  spark.on("wholetx", function(data){
    var txcount = 0;
    //makeStatistics(193049); // how to get whole blocks on db? ...node
    txcount = txmodule.SetTxNumber((err, result) => {
      if(err)
      {
        console.log('error on set txcount');
      }
      else
      {
        console.log(result);
        txcount = result + 1;
        console.log('txcount : ', txcount);
        txmodule.insertTransactiononDB(data.tx, data.time, txcount, (err, result) => {
          if(err)
            console.log("Error occure during insert db data  : " + err);
        });
      }
    });
  });

  spark.on("history", function(data) {
    //console.log( Nodes.getTotalBlockNumber());
    console.success("API", "HIS", "Got history from:", data.id);
    client.emit("blocknumber", Nodes.getTotalBlockNumber());
    var time = chalk.reset.cyan(new Date().toJSON()) + " ";
    console.time(time, "COL", "CHR", "Got charts in");

    Nodes.addHistory(data.id, data.history, function(err, history) {
      console.timeEnd(time, "COL", "CHR", "Got charts in");

      if (err !== null) {
        console.error("COL", "CHR", "History error:", err);
      } else {
        var history = Nodes.getHistory();

      }
    });
    Nodes.getCharts();

    if(isDBInitilized)
    {
      blockmodule.insertHistoryonDB(data.history, (err, result) => {
        if(err)
          console.log("Error occure during insert db data  : " + err);
      });
    }

    isInitialized = true;

  });

  spark.on("node-ping", function(data) {
    var start =
      !_.isUndefined(data) && !_.isUndefined(data.clientTime) ? data.clientTime : null;

    spark.emit("node-pong", {
      clientTime: start,
      serverTime: _.now()
    });

    console.info("API", "PIN", "Ping from:", data.id);
  }); //이건 서버와 클라이언트의 시간 확인

  spark.on("latency", function(data) {
    console.log('recieve latency');
    if(isInitialized === false)
    {
      return ;
    }

    if (!_.isUndefined(data.id)) {
      Nodes.updateLatency(data.id, data.latency, function(err, latency) {
        if (err !== null) {
          console.error("API", "PIN", "Latency error:", err);
        }

        if (latency !== null) {
          console.info("API", "PIN", "Latency:", latency, "from:", data.id);
        }
      });

    }
  });

  spark.on("end", function(data) {
    Nodes.inactive(spark.id, function(err, stats) {
      if (err !== null) {
        console.error("API", "CON", "Connection end error:", err);
      } else {
        client.write({
          action: "inactive",
          data: stats
        });

        console.warn(
          "API",
          "CON",
          "Connection with:",
          spark.id,
          "ended:",
          data
        );
      }
    });
  });
});

getBlockListFromAPI = function(range){

};

var makeStatistics = function(data)
{
  blockmodule.GetBlockonDB(data, (err, block) =>
    {
      if(err)
      {
        console.log('Error Getting block on DB');
      }
      else
      {
        if(block == null) return;
        // or else things
        else
        {
          console.log("block : ", block);


          // for kor date(GMT+9)
          //If u want to set time on ur location, find ur time difference! :)

          var blockdata = {
            blockNumber : block.blockNumber, //for find double check
            date : null, //set on getblocktimeonDB
            totalMakeBlock : 1,
            difficulty : block.difficulty ,
            blockTime : null, // set on getblocktimeonDB
            gasLimit : block.gasLimit,
            gasSpending : block.gasSpending,
            uncleCount : block.uncleCount
          };
          setStatDataonDB(block.age,block.blockNumber,(err, result) => { // result => blockdata.blocktime
            if(err)
            {
              blockdata.blockTime = 0;
            }
            else
            {

            blockdata.blockTime = result;

            var newtime = new Date(block.age);
            blockdata.date = new Date(newtime.getFullYear(), newtime.getMonth(), newtime.getDate(),9,0,0,0);

            statmodule.insertStatsonDB(blockdata,(err)=>{
              if(err)
              {
                console.log("already exist. update");
                statmodule.updateStatsOnDB(blockdata,(err, result)=>{
                  if(err)
                  {
                    console.log("error on update : ", err);
                  }
                  else console.log("success");
                });
              }
              else
                {
                console.log("make new stats");
                }
              });
            }
          });
        }
      }
    });
  // recursive <setdebounced
};

var setStatDataonDB = function(blocktimestamp,blocknumber, callback)
{
  if(blocknumber > 1){
    blockmodule.GetBlockonDB(blocknumber - 1, (err, prevblock) =>
    {
      if(err)
      {
        console.log("failed to get prevblock's timestamp ");
        callback(err, null);
      }
      else
      {
        console.log(prevblock);
        callback(null, (blocktimestamp - prevblock.age) / 1000 );
        console.log("timestamp on here : ",blocktimestamp - prevblock.age);
      }
    });
  }
  else callback(null, 0); // if blocknumber == 1
};

client.on("connection", socket => {
  console.log("Listener is coming");
  socket.on("ready", function(err) {
    // client.emit('init', { nodes: Nodes.all() });
    Nodes.getCharts();
    // console.log('2' + _.map(Nodes._debounced,'height'));
  });

  socket.on("requestBlock", function(data) {
    var startIndex = data.start;

    var endIndex = startIndex + data.count;
    var range = _.range(startIndex, endIndex);
  });

  socket.on("requestOnDBBlock", function() {
    var blockNumber = Nodes.getHistory().GetLastestBlockNumber();

    if(blockNumber == 0)
      blockNumber = blockmodule.GetMaxBlockNumber();

      console.log(blockNumber);

    console.log(blockmodule.GetHistoryDB(blockNumber, 100, (err, result) => {
      if(err)
        console.log('Error Occured in BlockModule');
      else
      {
        client.emit('blocklist', result.reverse());
      }

    }));
  });

  socket.on("requestOnTxBlock", function(){
    txmodule.SetTxNumber((err, result)=> {
      if(err)
      {
        console.log('error on Setting Tx Number');
      }
      else
      {
        console.log("txsize : ", result);
        txmodule.GetTransactiononDB(result, (err, txlist) =>{
          if(err)
          {
            console.log('Error on get Transactions List');
          }
          else
          {
            client.emit('txlist', txlist);
            console.log(txlist);
          }
        });
      }
    });
  });

});


var latencyTimeout = setInterval(function() {
  //client.emit('client-ping',{serverTime: _.now()},5000);
});

// Cleanup old inactive nodes
var nodeCleanupTimeout = setInterval(function() {
  client.emit("init", Nodes.all());

  Nodes.getCharts();
}, 1000 * 60 * 60);

server.listen(process.env.PORT || 3000, function() {
  database.init(app, config, (db) => {
    blockmodule.init(db);
    txmodule.init(db);
    statmodule.init(db);
  });
});

module.exports = server;
