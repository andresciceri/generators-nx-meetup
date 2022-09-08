import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { OrdersListComponent } from './pages/orders-list/orders-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'list',
        component: OrdersListComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class ShippingOrdersRoutingModule {}
