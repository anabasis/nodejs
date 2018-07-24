import { SizeButtonsComponent } from './../../ui-features/buttons/size-buttons/size-buttons.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss'],
})
export class StatelistComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      TxHash: {
        title: 'TxHash',
        valuePrepareFunction: (TxHash?: string) => {
            return TxHash.substring(0, 5) + '...';
        },
      },
      Age: {
        title: 'Age',
        type: 'number',
      },
      From: {
        title: 'From',
        type: 'string',
      },
      To: {
        title: 'To',
        type: 'string',
      },
      Gas: {
        title: 'Gas',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor() {

  }

  count: number;
  public ngOnInit(): void {
    this.count = 1;
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

  public OnDestroy(): void {
    this.count = 3;
  }
}
