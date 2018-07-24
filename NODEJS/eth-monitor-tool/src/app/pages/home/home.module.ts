import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { HomeRoutingModule, routedComponents } from './home-routing.module';
import { ChartjsBarBlockTimeComponent } from './chartjs/chartjs-bar-blocktime.component';
import { ChartjsBarBlockPropagationComponent } from './chartjs/chartjs-bar-blockpropagation.component';
import { ChartjsBarGasLimitComponent } from './chartjs/chartjs-bar-gaslimit.component';
import { ChartjsBarUncleCountComponent } from './chartjs/chartjs-bar-unclecount.component';
import { ChartjsBarTransactionsComponent } from './chartjs/chartjs-bar-transactions.component';
import { ChartjsBarGasSpendingComponent } from './chartjs/chartjs-bar-gasspending.component';

const components = [
  ChartjsBarBlockTimeComponent,
  ChartjsBarBlockPropagationComponent,
  ChartjsBarGasLimitComponent,
  ChartjsBarUncleCountComponent,
  ChartjsBarTransactionsComponent,
  ChartjsBarGasSpendingComponent,
];

@NgModule({
  imports: [ThemeModule, HomeRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class HomeModule {}
