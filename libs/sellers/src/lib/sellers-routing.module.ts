import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SellerListComponent } from './pages/seller-list/seller-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'list',
        component: SellerListComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class SellersRoutingModule {}
