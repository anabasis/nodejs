import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { ListRoutingModule, routedComponents } from './list-routing.module';
import { AccountListComponent } from './account-list/account-list.component';
import { BlockListComponent } from './block-list/block-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { SmartTableService } from '../../@core/data/smart-table.service';

const components = [
  AccountListComponent,
  BlockListComponent,
  TransactionListComponent,
  ContractListComponent,
];

@NgModule({
  imports: [ThemeModule, ListRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule,  Ng2SmartTableModule],
  declarations: [...routedComponents, ...components],
  providers: [
    SmartTableService,
  ],
})
export class ListModule {}
