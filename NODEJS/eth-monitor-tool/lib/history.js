
var _ = require('lodash');
//var d3 = require('d3');
//var fs = require('fs');

var MAX_HISTORY = 50;

var BLOCK_NUMBER = 0;

var MAX_PEER_PROPAGATION = 50;
var MIN_PROPAGATION_RANGE = 0;
var MAX_PROPAGATION_RANGE = 10000;

var MAX_UNCLES = 1000;
var MAX_UNCLES_PER_BIN = 25;
var MAX_BINS = 50;
var saveDataCount = 0;
var LatestBlockNumber = 0;
var OldestBlockNumber = 0;
var newBlock;

var rearIndex = 0;
var frontIndex = 0;
var capapcity = 50;
var dataCount = 0;


var History = function History(data)
{
	this._items = [];
  this._callback = null;
  this._pendingTxList = {

  };

  var block = {
    number: 0,
    hash: '?',
    difficulty: 0,
    totalDifficulty: 0,
    transactions: [],
    uncles: []
  };

  var item = {
    height: block.number,
    block: block,
    forks: [block],
    propagTimes: []
  }

  for(var i = 0; i < capapcity; i++)
  {
    this._items.push(item);
  }
  this.rearIndex = 0;
  this.frontIndex = 0;
  this.capacity = 50;
  this.dataCount = 0;
}

History.prototype.add = function(block, id, addingHistory)
{
	var changed = false;

	if( !_.isUndefined(block) && !_.isUndefined(block.number) && !_.isUndefined(block.uncles) && !_.isUndefined(block.transactions) && !_.isUndefined(block.difficulty) && block.number > 0 )
	{
		//trusted = (process.env.LITE === 'true' ? true : trusted);
		var historyBlock = this.search(block.number);
		var forkIndex = -1;

		var now = _.now();

		//block.trusted = trusted;
		block.arrived = now;
		block.received = now;
		block.propagation = 0;
		block.fork = 0;

		if( historyBlock )
		{
			// We already have a block with this height in collection

			// Check if node already checked this block height
			var propIndex = _.findIndex( historyBlock.propagTimes, { node: id } );

			// Check if node already check a fork with this height
			forkIndex = compareForks(historyBlock, block);

			if( propIndex === -1 )
			{
				// Node didn't submit this block before
				if( forkIndex >= 0 && !_.isUndefined(historyBlock.forks[forkIndex]) )
				{
					// Found fork => update data
					block.arrived = historyBlock.forks[forkIndex].arrived;
					block.propagation = now - historyBlock.forks[forkIndex].received;
				}
				else
				{
					// No fork found => add a new one
					var prevBlock = this.prevMaxBlock(block.number);

					if( prevBlock )
					{
            console.log("current block : " + block.arrived + ", prev block : " + prevBlock.block.arrived);
						block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);
						console.log("blocktime1 : ", block.time);
						if(block.number < this.bestBlock().height)
							block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
							console.log("blocktime2 : ", block.time);
					}
					else
					{
            console.log('prev block not found');
						block.time = 0;
					}

					forkIndex = historyBlock.forks.push(block) - 1;
					historyBlock.forks[forkIndex].fork = forkIndex;
				}

				// Push propagation time
				historyBlock.propagTimes.push({
					node: id,
					//trusted: trusted,
					fork: forkIndex,
					received: now,
					propagation: block.propagation
				});
				//console.log(node);
			}
			else
			{
				// Node submited the block before
				if( forkIndex >= 0 && !_.isUndefined(historyBlock.forks[forkIndex]) )
				{
					// Matching fork found => update data
					block.arrived = historyBlock.forks[forkIndex].arrived;

					if( forkIndex === historyBlock.propagTimes[propIndex].fork )
					{
						// Fork index is the same
						block.received = historyBlock.propagTimes[propIndex].received;
						block.propagation = historyBlock.propagTimes[propIndex].propagation;
					}
					else
					{
						// Fork index is different
						historyBlock.propagTimes[propIndex].fork = forkIndex;
						historyBlock.propagTimes[propIndex].propagation = block.propagation = now - historyBlock.forks[forkIndex].received;
					}

				}
				else
				{
					// No matching fork found => replace old one
					block.received = historyBlock.propagTimes[propIndex].received;
					block.propagation = historyBlock.propagTimes[propIndex].propagation;

					var prevBlock = this.prevMaxBlock(block.number);

					if( prevBlock )
					{
						block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);
						console.log("blocktime3 : ", block.time);
						if(block.number < this.bestBlock().height)
							block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
							console.log("blocktime4 : ", block.time);
					}
					else
					{
						block.time = 0;
					}

					forkIndex = historyBlock.forks.push(block) - 1;
					historyBlock.forks[forkIndex].fork = forkIndex;
				}
			}

			if( /*trusted &&*/ !compareBlocks(historyBlock.block, historyBlock.forks[forkIndex]) )
			{
				// If source is trusted update the main block
				//historyBlock.forks[forkIndex].trusted = trusted;
				historyBlock.block = historyBlock.forks[forkIndex];
			}

			block.fork = forkIndex;

			changed = true;

		}
		else
		{
			// Couldn't find block with this height

			// Getting previous max block
      var prevBlock = this.prevMaxBlock(block.number);
      if(prevBlock != undefined)
        // console.log('Prevblock : ' + prevBlock.height)
			if( prevBlock )
			{
				block.time = Math.max(block.arrived - prevBlock.block.arrived, 0);
				console.log("blocktime5 : ", block.time);
				if(block.number < this.bestBlock().height)
					block.time = Math.max((block.timestamp - prevBlock.block.timestamp) * 1000, 0);
					block.time = parseFloat((block.time / 1000).toFixed(1));
			}
			else
			{
				block.time = 0;
			}

			var item = {
				height: block.number,
				block: block,
				forks: [block],
				propagTimes: []
			}

			if( this.getLength() === 0 || (this.getLength() === MAX_HISTORY && block.number > this.worstBlockNumber()) || (this.getLength() < MAX_HISTORY && addingHistory) )
			{
				item.propagTimes.push({
					node: id,
					//trusted: trusted,
					fork: 0,
					received: now,
					propagation: block.propagation
				});
				this._save(item);

				changed = true;
			}
		}

		return {
			block: block,
			changed: changed
		};
	}

	return false;
}

History.prototype.saveBlock= function(block){
  if( this.dataCount == MAX_HISTORY)
  {
    this.popBlock();
  }

    this._items[this.rearIndex] = block;
    console.log('data saved in queue, rearIndex : ' + this.rearIndex + ', data : ' + this._items[this.rearIndex].height);

    this.rearIndex++;
    this.rearIndex %= this.capacity;
    this.dataCount++;


  return true;
}

History.prototype.popBlock = function() {
  if( false==this.isEmpty() ){
    ret = this._items[this.frontIndex];
    this._items[this.frontIndex] = undefined;
    this.frontIndex++;
    this.frontIndex %= this.capacity;
    this.dataCount--;
    return ret;
}
return null;
}
History.prototype.isFull = function(){
  rear = (this.rearIndex+1) % this.capacity;
  if( rear==this.frontIndex ){
      return true;
  }
  return false;
}

History.prototype.getLength = function() {
  if( this.rearIndex>this.frontIndex ){
    return this.rearIndex-this.frontIndex;
}
if( this.frontIndex>this.rearIndex ){
    return this.capacity - (this.frontIndex-this.rearIndex);
}
return 0;
}

History.prototype.getBlockArray = function() {
  if( this.rearIndex>this.frontIndex )
    return _( this._items ).slice(this.rearIndex, this.frontIndex).value();
  else if(this.rearIndex < this.frontIndex )
    return _.merge(this._items.slice(this.frontIndex, this.capacity -1), this._items.slice(0, this.rearIndex)).value();

}

History.prototype.isEmpty = function(){
  if( this.frontIndex==this.rearIndex ){
      return true;
  }
  return false;
}


function compareBlocks(block1, block2)
{
	if( block1.hash 				!== block2.hash ||
		block1.parentHash 			!== block2.parentHash ||
		block1.sha3Uncles 			!== block2.sha3Uncles ||
		block1.transactionsRoot 	!== block2.transactionsRoot ||
		block1.stateRoot 			!== block2.stateRoot ||
		block1.miner 				!== block2.miner ||
		block1.difficulty 			!== block2.difficulty ||
		block1.totalDifficulty 		!== block2.totalDifficulty)
		return false;

	return true;
}

function compareForks(historyBlock, block2)
{
	if( _.isUndefined(historyBlock) )
		return -1;

	if( _.isUndefined(historyBlock.forks) || historyBlock.forks.length === 0 )
		return -1;

	for(var x = 0; x < historyBlock.forks.length; x++)
		if(compareBlocks(historyBlock.forks[x], block2))
			return x;

	return -1;
}

History.prototype._save = function(block)
{
	this.saveBlock(block);
 // console.log('save data : ' + block.height);
 // console.log(block);
  //this._items = _.orderBy( this._items, 'height', false );
  LatestBlockNumber = _.max(this.LatestBlockNumber, block.height);


}

History.prototype.clean = function(max)
{
	if(max > 0 && this.getLength() > 0 && max < this.bestBlockNumber())
	{
		console.log("MAX:", max);

		console.log("History items before:", this.getLength());

		this._items = _(this._items).filter(function(item) {
			return (item.height <= max /*&& item.block.trusted === false*/);
		}).value();

		console.log("History items after:", this.getLength());
	}
}

History.prototype.search = function(number)
{
	var index = _.findIndex( this._items, { height: number } );

	if(index < 0)
		return false;

	return this._items[index];
}

History.prototype.prevMaxBlock = function(number)
{
  if(this.isEmpty()) {
    return undefined;
  }
  var prevIndex = (this.rearIndex - 1) % capapcity;
  return this._items[prevIndex];
}

History.prototype.bestBlock = function()
{
	return _.max(this._items, 'height');
}

History.prototype.bestBlockNumber = function()
{
	var best = this.bestBlock();

	if( !_.isUndefined(best.height) )
		return best.height;

	return 0;
}

History.prototype.worstBlock = function()
{
	return _.min(this._items, 'height');
}

History.prototype.worstBlockNumber = function(/*trusted*/)
{
	var worst = this.worstBlock();

	if( !_.isUndefined(worst.height) )
		return worst.height;

	return 0;
}

History.prototype.setTotalBlockNumber = function(data)
{
	BLOCK_NUMBER = data;
}
History.prototype.getTotalBlockNumber = function()
{
	return BLOCK_NUMBER;
}
History.prototype.getNodePropagation = function(id)
{
	var propagation = new Array( MAX_PEER_PROPAGATION );
	var bestBlock = this.bestBlockNumber();
	var lastBlocktime = _.now();

	_.fill(propagation, -1);

	var sorted = _( this._items )
		.orderBy( 'height', false )
		.slice( 0, MAX_PEER_PROPAGATION )
		.forEach(function (item, key)
		{
			var index = MAX_PEER_PROPAGATION - 1 - bestBlock + item.height;

			if(index >= 0)
			{
				var tmpPropagation = _.result(_.find(item.propagTimes, 'node', id), 'propagation', false);

				if (_.result(_.find(item.propagTimes, 'node', id), 'propagation', false) !== false)
				{
					propagation[index] = tmpPropagation;
					lastBlocktime = item.block.arrived;
				}
				else
				{
					propagation[index] = Math.max(0, lastBlocktime - item.block.arrived);
				}
			}
		});
		sorted = _(sorted).reverse().value(); //여기때문에 아마도 node가 뒤로 안밀리는기분임

		//console.log(this._items.node);

	return propagation;
}

History.prototype.getBlockPropagation = function()
{
	var propagation = [];
	var avgPropagation = 0;

	_.forEach(this._items, function (n, key)
	{
		_.forEach(n.propagTimes, function (p, i)
		{
			var prop = Math.min(MAX_PROPAGATION_RANGE, _.result(p, 'propagation', -1));

			if(prop >= 0)
				propagation.push(prop);
		});
	});

	if(propagation.length > 0)
	{
		 avgPropagation = Math.round( _.sum(propagation) / propagation.length );
	}

	// var data = d3.layout.histogram()
	// 	.frequency( false )
	// 	.range([ MIN_PROPAGATION_RANGE, MAX_PROPAGATION_RANGE ])
	// 	.bins( MAX_BINS )
	// 	( propagation );

	// var freqCum = 0;
	// var histogram = data.map(function (val) {
	// 	freqCum += val.length;
	// 	var cumPercent = ( freqCum / Math.max(1, propagation.length) );

	// 	return {
	// 		x: val.x,
	// 		dx: val.dx,
	// 		y: val.y,
	// 		frequency: val.length,
	// 		cumulative: freqCum,
	// 		cumpercent: cumPercent
	// 	};
	// });
	// for(var i = 0 ; i < this.getLength() -1 ; i++ )
	//  {
	// 		console.log("array's position : " , i);
	// 		console.log(this._items[i].height);
	//  }
	// fs.writeFile('file01.ts',toString(this._items[0].height),'utf8',function(e){
	// 	if(e){
	// 		console.log(e);
	// 	}else{
	// 		console.log('01 WRITE DONE!');
	// 	}
	// });
	//console.log(this._items[0]); // kisu add it
	return {
		//histogram: histogram,
		propagation : propagation,
		avg: avgPropagation

	};


}

History.prototype.getUncleCount = function()
{
   var uncles = _( this._items )
      .orderBy( 'height', false )
      // .filter(function (item)
      // {
      //    return item.block.trusted;
      // })
      .slice(0, MAX_UNCLES)
      .map(function (item)
      {
         return item.block.uncles.length;
      })
      .value();
   var uncleBins = 0;
   for(var i = 0; i <= this.getLength() - 1 ; i++)
      uncleBins += uncles[i];
   // var uncleBins = _.fill( Array(MAX_BINS), 0 );

   // var sumMapper = function (array, key)
   // {
   //    uncleBins[key] = _.sum(array);
   //    return _.sum(array);
   // };

   // _.map(_.chunk( uncles, MAX_UNCLES_PER_BIN ), sumMapper);

   return uncleBins;
}

History.prototype.getBlockTimes = function()
{
	var blockTimes = _(this._items )
		.orderBy( 'height', false )
		// .filter(function (item)
		// {
			// return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			console.log("blocktime7 : ", block.time);
			return (item.block.time / 1000);
		})
		.value();

	return blockTimes;
}

History.prototype.getAvgBlocktime = function()
{
	var validatecount = 0;
	var blockTimes = _( this._items )
		.orderBy( 'height', false )
		// .filter(function (item)
		// {
			// return item.block.trusted;
		// })
		// .slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			if(item.block.time == null)
			item.block.time = 0;
			return item.block.time;
		})
		.value();
		for(var i = 0; i < blockTimes.length; i++)
		{
			if(blockTimes[i] != 0)
			validatecount++;
		}
	return _.sum(blockTimes) / (blockTimes.length === 0 ? 1 : validatecount);
}

History.prototype.getGasLimit = function()
{
	var gasLimitHistory = _( this._items )
		.orderBy( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.gasLimit / 10000;
		})
		.value();

	return gasLimitHistory;
}

History.prototype.getDifficulty = function()
{
	var difficultyHistory = _( this._items )
		.orderBy( 'height', false )
		//.filter(function (item)
		//{
		//	return item.block.trusted;
		//})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.difficulty / 1000;
		})
		.value();

	return difficultyHistory;
}

History.prototype.getTransactionsCount = function()
{
	var txCount = _( this._items )
		.orderBy( 'height', false )
		//.filter(function (item)
		//{
		//	return item.block.trusted;
		//})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.transactions.length;
		})
		.value();

	return txCount;
}

History.prototype.getGasSpending = function()
{
	var gasSpending = _( this._items )
		.orderBy( 'height', false )
		//.filter(function (item)
		//{
		//	return item.block.trusted;
		//})
		.slice(0, MAX_BINS)
		.reverse()
		.map(function (item)
		{
			return item.block.gasUsed;
		})
		.value();

	return gasSpending;
}



History.prototype.getAvgHashrate = function()
{
	if( this.isEmpty() )
		return 0;

	var blocktimeHistory = _( this._items )
		.orderBy( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, 64)
		.map(function (item)
		{
			return (item.block.time / 1000);
		})
		.value();

	var avgBlocktime = (_.sum(blocktimeHistory) / blocktimeHistory.length)/1000;

	return this.bestBlock().block.difficulty / avgBlocktime;
}

History.prototype.getMinersCount = function()
{
	var miners = _( this._items )
		.orderBy( 'height', false )
		// .filter(function (item)
		// {
		// 	return item.block.trusted;
		// })
		.slice(0, MAX_BINS)
		.map(function (item)
		{
			return item.block.miner;
		})
		.value();

	var minerCount = [];

	_.forEach( _.countBy(miners), function (cnt, miner)
	{
		minerCount.push({ miner: miner, name: false, blocks: cnt });
	});

	return _(minerCount)
		.orderBy( 'blocks', false )
		.slice(0, 2)
		.value();
}

History.prototype.setCallback = function(callback)
{
	this._callback = callback;
}

History.prototype.getCharts = function()
{


	if(this._callback !== null)
	{
    var chartHistory = _( this._items )
			.orderBy( 'height', false )
			// .filter(function (item)f
			// {
			// 	return item.block.trusted;
			// })
			.slice(0, MAX_BINS)
			//.reverse()
			.map(function (item)
			{
				return {
					height: item.height,
					blocktime: item.block.time,
					difficulty: item.block.difficulty,
					uncles: item.block.uncles.length,
					transactions: item.block.transactions.length,
					gasSpending: item.block.gasUsed,
					gasLimit: item.block.gasLimit,
					miner: item.block.miner

				};

			})
      .value();

	// console.log("chart's height List : " + _.map( chartHistory, 'height'));
    console.log("avg Block Time : " + this.getAvgBlocktime());
		this._callback(null, {
			height : _.map( chartHistory, 'height' ),
			blocktime : _.map( chartHistory, 'blocktime' ),
			avgBlocktime : parseFloat((this.getAvgBlocktime() / 1000).toFixed(1)),
			difficulty : _.map( chartHistory, 'difficulty' ),
			uncles : _.map( chartHistory, 'uncles' ),
			transactions : _.map( chartHistory, 'transactions' ),
			gasSpending : _.map( chartHistory, 'gasSpending' ),
			gasLimit : _.map( chartHistory, 'gasLimit' ),
			miners : this.getMinersCount(),
			propagation : this.getBlockPropagation().propagation,
			uncleCount : this.getUncleCount(),
			avgHashrate : this.getAvgHashrate(),
			bestblocknumber : _.max(_.map(chartHistory,'height')),
			worstblocknumber : _.min(_.map(chartHistory,'height'))

		});
	}
}

History.prototype.requiresUpdate = function()
{
	// return ( this._items.length < MAX_HISTORY && !_.isEmpty(this._items) );
	return ( this.getLength() < MAX_HISTORY );
}



History.prototype.getWholeHistory = function(blockNumber)
{

  var max = blockNumber + 1;
  var min = blockNumber - 1999;
  var range = _.range(0, 10000);
	//var range = _.range( _.max([ 0, best - MAX_HISTORY ]), best + 1);

	return {
		max: 1000,
		min: 0,
		list: _( range ).value()
	};
}


History.prototype.getMissingBlockList = function(blockNumber)
{
  var max = blockNumber + 1;
  var min;
  var range = _.range(min, max);


  if(this.isEmpty())
  {
    min = blockNumber - 50;
    if(min < 1)
      min = 1;

      range = _.range(min, max);

    return {
      max : max,
      min : min,
      list : _( range ).value()
    }
  }
  else
  {
    var index = (this.rearIndex - 1) % this.capacity;
    var latest = this._items[index].height + 1;
    range = _.range(latest, max);
    return {
      max : max,
      min : latest,
      list : _(range).value()
    }
  }



}

History.prototype.ViewHistory = function() {
  var array = _(this._items).orderBy('height', false).value();
  console.log(array);
}

History.prototype.SetNewBlock = function(newBlock) {
  this.newBlock = newBlock;
  //console.log("new block timestamp", this.newBlock.timestamp);
  console.log('new block saved : ' + this.newBlock.number);
};

History.prototype.SetPendingTx = function(data) {
  this.array = data;
}

History.prototype.GetLastestBlockNumber = function() {
	if(this.newBlock == undefined)
		return 0;
	return this.newBlock.number;
}


module.exports = History;
