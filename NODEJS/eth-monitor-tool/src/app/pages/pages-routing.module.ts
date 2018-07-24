import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { Home2Component } from './home2/home2.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'home2',
    component: Home2Component,
  }, {
    path: 'ui-features',
    loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
  }, {
    path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule',
  }, {
    path: 'list',
    loadChildren: './list/list.module#ListModule',
  }, {
    path: '',
    redirectTo: 'home2',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
