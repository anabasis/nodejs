import { TotalChartBlockTimeComponent } from './blocktime/totalchart-blocktime.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartsComponent } from './charts.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

const routes: Routes = [{
  path: '',
  component: ChartsComponent,
  children: [{
    path: 'blocktime',
    component: TotalChartBlockTimeComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule { }

export const routedComponents = [
  ChartsComponent,
  TotalChartBlockTimeComponent,
];
