import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
@Injectable()
export class ListService {
  socket;
  callback;
  callback_block;
  callback_latest;
  callback_Tx;
  callback_blocktable;
  callback_txtable;
  data = {
    'id': 0,
    'firstName': '0',
    'lastName': '0',
    'username': '0',
    'email': '0',
    'age': 0,
  };
  i = 0;
  latestblocknumber = 0;
  lastblocknumber = 0;
  unclesblocknumber = 0;
  bestblocknumber = 0;

  blockpropagation = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  blocktime = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  gaslimit = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  gasspending = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  transaction = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

  unclecount = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];


  constructor() {
    this.socket = io();
    this.socket.on('refreshAccount', (data) => {
      this.data = data;
      this.callback(data);
    });
    ////////////////////////////////////////////////
    this.socket.on('charts', (data) => {
      this.callback(data);
    });
    this.socket.on('block', (stat) => {
      this.callback_block(stat);
    });
    this.socket.on('pendingTx', (data) => {
      this.callback_Tx(data);
    });
    this.socket.on('blocklist', (data) => {
      this.callback_blocktable(data);
    });
    this.socket.on('txlist', (data) => {
      this.callback_txtable(data);
    });
    // this.socket.on('refreshblockpropagation', (data) => {
    //   this.blockpropagation = data;
    // });
    // // this.socket.on('refreshblocktime', (data) => {
    // //   this.blocktime = data;
    // // });
    // this.socket.on('refreshgasspending', (data) => {
    //   this.gasspending = data;
    // });
    // this.socket.on('refreshgaslimit', (data) => {
    //   this.gaslimit = data;
    // });
    // this.socket.on('refreshtransaction', (data) => {
    //   this.transaction = data;
    // });
    // // this.socket.on('refreshunclecount', (data) => {
    // //   this.unclecount = data;
    // // });
    // ////////////////////////////////////////////////
    // this.socket.on('refreshlatestblocknumber', (latestblock) => {
    //   this.callback_latest(latestblock);
    // });
    // // this.socket.on('refreshunclesblocknumber', (data) => {
    // //   this.unclesblocknumber = data;
    // // });
    // // this.socket.on('refreshbestblocknumber', (data) => {
    // //   this.bestblocknumber = Math.max();
    // // });
    // // this.socket.on('refreshlastblocknumber', (data) => {
    //   this.lastblocknumber = data;
    // });
    //////////////////////////////////////////////
  }
  getLatest() {
    return this.latestblocknumber;
  }
  getLast() {
    return this.lastblocknumber;
  }
  getBest() {
    return this.bestblocknumber;
  }
  getUncles() {
    return this.unclesblocknumber;
  }
  getblockpropagation() {
    return this.blockpropagation;
  }
  getblocktime() {
    return this.blocktime;
  }
  getgaslimit() {
    return this.gaslimit;
  }
  getgasspending() {
    return this.gasspending;
  }
  gettransaction() {
    return this.transaction;
  }
  getunclecount() {
    return this.unclecount;
  }
  //////////////////////////////////////////////////////
  requestData(count: number) {
    this.socket.emit('requestData', count);
  }
  ///////////////////////////////////////////////////////
  request() {
    this.socket.emit('ready');
  }

  requestBlockData(startBlock: number, count: number) {
    this.socket.emit('requestBlock', {start: startBlock, count: count});
  }

  setCallBack_blockTable(fn) {
    this.callback_blocktable = fn;
  }
  setCallBack_txTable(fn) {
    this.callback_txtable = fn;
  }
  setCallBack(fn) {
    this.callback = fn;
  }
  setCallBack_block(fn) {
    this.callback_block = fn;
  }
  setCallBack_PendingTx(fn) {
    this.callback_Tx = fn;
  }

}
