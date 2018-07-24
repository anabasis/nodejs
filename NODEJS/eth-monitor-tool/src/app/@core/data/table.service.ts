import { Socket } from 'ng-socket-io';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import 'rxjs/add/operator/map';


@Injectable()
export class TableService {

  socket;
  callback;
  callbacktx;

  constructor() {
    this.socket = io();

    this.socket.on('blocklist', (data) => {
      this.callback(data);
    });

    this.socket.on('txlist', (data) => {
      this.callbacktx(data);
    });
  }

  setCallback(fn): void {
    this.callback = fn;
  }
  setCallbacktx(fn): void {
    this.callbacktx = fn;
  }

  getTxList() {
    this.socket.emit('requestOnTxBlock');
  }

  getBlockList() {
    this.socket.emit('requestOnDBBlock');
  }





}
