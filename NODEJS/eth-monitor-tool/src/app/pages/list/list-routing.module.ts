import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { AccountListComponent } from './account-list/account-list.component';
import { BlockListComponent } from './block-list/block-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { ContractListComponent } from './contract-list/contract-list.component';

const routes: Routes = [{
  path: '',
  component: ListComponent,
  children: [{
    path: 'account-list',
    component: AccountListComponent,
  }, {
    path: 'block-list',
    component: BlockListComponent,
  }, {
    path: 'transaction-list',
    component: TransactionListComponent,
  }, {
    path: 'contract-list',
    component: ContractListComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule { }

export const routedComponents = [
  ListComponent,
  AccountListComponent,
  BlockListComponent,
  TransactionListComponent,
  ContractListComponent,
];
