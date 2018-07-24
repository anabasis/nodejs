import { ChartsComponent } from './charts.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsRoutingModule, routedComponents } from './charts-routing.module';
import { TotalChartBlockTimeComponent } from './blocktime/totalchart-blocktime.component';
import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';

// import 'chartjs-plugin-zoom';


const components = [
  TotalChartBlockTimeComponent,
];

@NgModule({
  imports: [ThemeModule, ChartsRoutingModule, NgxEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
