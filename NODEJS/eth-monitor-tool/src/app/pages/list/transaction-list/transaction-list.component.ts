import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TableService } from '../../../@core/data/table.service';
@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class TransactionListComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      txNumber: {
        title: 'txNumber',
        type: 'number',
      },
      txHash: {
        title: 'txhash',
        valuePrepareFunction: (TxHash?: string) => {
          return TxHash.substring(0, 5) + '...';
          },
      },
      age: {
        title: 'Time',
        type: 'number',
      },
      blockNumber: {
        title: 'blocknumber',
        type: 'number',
      },
      from: {
        title: 'from',
        valuePrepareFunction: (TxHash?: string) => {
          return TxHash.substring(0, 5) + '...';
      }      },
      value: {
        title: 'value',
        type: 'number',
      },
      to: {
        title: 'to',
        valuePrepareFunction: (TxHash?: string) => {
          return TxHash.substring(0, 5) + '...';
      }      },
      gasSpend: {
        title: 'gasSpend',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private service: TableService) {

    }

  count: number;
  public ngOnInit(): void {
    this.count = 30;
    this.service.setCallbacktx((array) => {
      this.source.load(array);
      // console.log(array);

    });
    this.service.getTxList();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public OnDestroy(): void {
  }
}
