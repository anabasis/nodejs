import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
    selector: 'app-nodelist',
    templateUrl: './nodelist.component.html',
    styleUrls: ['./nodelist.component.scss'],
  })
  export class NodelistComponent implements OnDestroy, OnInit {

    settings = {
        actions: false,
        columns: {
          Result: {
            title: 'Result',
            type: '',
          },
          TxHash: {
            title: 'Name',
            valuePrepareFunction: (TxHash?: string) => {
                return TxHash.substring(0, 5) + '...';
            },
          },
          Coinbase: {
            title: 'Name',
            valuePrepareFunction: (Coinbase?: string) => {
                return Coinbase.substring(0, 5) + '...';
            },
          Node: {
            title: 'Node',
            type: 'string',
          },
          Net: {
            title: 'Net',
            type: 'string',
          },
          Client: {
            title: 'Client',
            type: 'String',
          },
          ip: {
            title: 'ip',
            type: 'String',
          },
        },
      },
    };

    source: LocalDataSource = new LocalDataSource();
    constructor() {

    }

    count: number;
    public ngOnInit(): void {

    }

    RefreshTable(data) {
      this.source.load(data);
    }

    RefreshAccount(): void {
      this.count++;

    }

    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }

    public ngOnDestroy(): void {

    }
  }
