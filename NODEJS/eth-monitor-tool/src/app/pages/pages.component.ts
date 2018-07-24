import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'app-pages',
  template: `
    <app-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-sample-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
