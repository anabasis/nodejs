import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ChartjsComponent } from './chartjs/chartjs.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [{
    path: 'chartjs',
    component: ChartjsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

export const routedComponents = [
  HomeComponent,
  ChartjsComponent,
];
