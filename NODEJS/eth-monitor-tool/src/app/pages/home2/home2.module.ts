import { ChartjsBlockPropagationComponent } from './chartjs-blockpropagation/chartjs-blockpropagation.component';
import { ChartjsBlockTimeComponent } from './chartjs-blocktime/chartjs-blocktime.component';
import { ChartjsGaslimitComponent } from './chartjs-gaslimit/chartjs-gaslimit.component';
import { ChartjsGasspendingComponent } from './chartjs-gasspending/chartjs-gasspending.component';
import { ChartjsTransactionComponent } from './chartjs-transactions/chartjs-transaction.component';
import { ChartjsUnclecountComponent } from './chartjs-unclecount/chartjs-unclecount.component';
import { ChartjsDifficultyComponent } from './chartjs-difficulty/chartjs-difficulty.component';
import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { Home2Component } from './home2.component';
import { LastblockComponent } from './top-lastblock/lastblock.component';
import { LatestComponent } from './top-latest/latest.component';
import { UnclesComponent } from './top-uncles/uncles.component';
import { NodelistComponent } from './nodelist/nodelist.component';
import { StatelistComponent } from './statelist/statelist.component';
import { ListService } from '../../@core/data/list.service';
import { AvgBlockTimeComponent } from './top-avgblocktime/avgblocktime.component';

import { PendingComponent } from './top-pending/pending.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    Home2Component,
    ChartjsBlockPropagationComponent,
    ChartjsBlockTimeComponent,
    ChartjsGaslimitComponent,
    ChartjsGasspendingComponent,
    ChartjsTransactionComponent,
    ChartjsUnclecountComponent,
    ChartjsDifficultyComponent,
    LastblockComponent,
    LatestComponent,
    UnclesComponent,
    StatelistComponent,
    AvgBlockTimeComponent,
    PendingComponent,
  ],
  providers: [
    ListService,
  ],
})
export class Home2Module { }
