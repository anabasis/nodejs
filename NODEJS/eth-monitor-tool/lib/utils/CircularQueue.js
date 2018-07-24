
var _ = require('lodash');

function CircularQueue(capacity){

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
    fork: [block],
    propagTime: []
  };
  this.capacity = capacity+1;
  this.buffer = [];
  this.frontIndex = 0;
  this.rearIndex = 0;

  for(var i = 0; i < this.capacity; i++)
  {
    this.buffer.push(item);
  }

};
CircularQueue.prototype.push = function(block){
  if( false==this.isFull() ){
     // console.log('data saved in queue ' + block);
      this.buffer[this.rearIndex] = block;
      this.rearIndex++;
      this.rearIndex %= this.capacity;
      return true;
  }
  return false;
};
CircularQueue.prototype.pop = function(){
  if( false==this.isEmpty() ){
      ret = this.buffer[this.frontIndex];
      this.buffer[this.frontIndex] = undefined;
      this.frontIndex++;
      this.frontIndex %= this.capacity;
      return ret;
  }
  return null;
};
CircularQueue.prototype.reset = function(){
  this.frontIndex = 0;
  this.rearIndex = 0;
}
CircularQueue.prototype.isFull = function(){
  rear = (this.rearIndex+1) % this.capacity;
  if( rear==this.frontIndex ){
      return true;
  }
  return false;
}
CircularQueue.prototype.isEmpty = function(){
  if( this.frontIndex==this.rearIndex ){
      return true;
  }
  return false;
}
CircularQueue.prototype.count = function(){
  if( this.rearIndex>this.frontIndex ){
      return this.rearIndex-this.frontIndex;
  }
  if( this.frontIndex>this.rearIndex ){
      return this.capacity - (this.frontIndex-this.rearIndex);
  }
  return 0;
}

CircularQueue.prototype.findIndex = function(number) {
  var index = _.findIndex( this.buffer, {height: number} );
  console.log('find index : ' + index);
  if(index < 0)
    return false;

  return this.buffer[index];
}

CircularQueue.prototype.getMax = function(category) {
  return _.max(this.getArray(), category);
}

CircularQueue.prototype.getMin = function(category) {
  return _.min(this.getArray(), category);
}

CircularQueue.prototype.getData = function(index) {
  return this.buffer[index];
}


CircularQueue.prototype.getArray = function() {
  console.log('Get array : ' + this.buffer.slice(this.rearIndex, this.frontIndex));
  if( this.rearIndex>this.frontIndex )
    return _( this.buffer ).slice(this.rearIndex, this.frontIndex).value();
  else if(this.rearIndex < this.frontIndex )
    return _.merge(this.buffer.slice(this.frontIndex, this.capacity -1), this.buffer.slice(0, this.rearIndex)).value();

}
CircularQueue.prototype.toString = function(){
  str = "";
  str += "capacity : "+this.capacity;
  str += ", count : "+this.count();
  str += ", frontIndex : "+this.frontIndex;
  str += ", rearIndex : "+this.rearIndex;
  str += ", [";
  for(loop=0; this.count()>loop; loop++){
      index = (loop+this.frontIndex) % this.capacity;
      str += this.buffer[index];
      if( (this.count()-1)>loop ){
          str += ", ";
      }
  }
  str += "]";
  return str;
}


module.exports = CircularQueue;
