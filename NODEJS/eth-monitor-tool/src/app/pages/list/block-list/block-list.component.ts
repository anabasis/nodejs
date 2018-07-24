import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { TableService } from '../../../@core/data/table.service';
@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})

export class BlockListComponent implements OnInit {
  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      blockNumber: {
        title: 'blockNumber',
        type: 'number',
      },
      hash: {
        title: 'hash',
        valuePrepareFunction: (TxHash?: string) => {
          return TxHash.substring(0, 5) + '...';
          },
        },
      age: {
        title: 'Time',
        type: 'number',
      },
      txNumber: {
        title: 'transaction',
        type: 'number',
      },
      miner: {
        title: 'miner',
        valuePrepareFunction: (TxHash?: string) => {
          return TxHash.substring(0, 5) + '...';
      }      },
      gasLimit: {
        title: 'gasLimit',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(private service: TableService) {

  }

  count: number;
  public ngOnInit(): void {
    // this.count = 30;
    this.service.setCallback((array) => {
      this.source.load(array);
    });
    this.service.getBlockList();
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
