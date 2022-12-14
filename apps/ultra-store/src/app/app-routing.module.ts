import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppMainComponent } from './app-main/app-main.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: AppMainComponent,
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          {
            path: 'products',
            loadChildren: () =>
              import('@generators-nx-meetup/products').then(
                (m) => m.ProductsModule
              ),
          },
          {
            path: 'sellers',
            loadChildren: () =>
              import('@generators-nx-meetup/sellers').then(
                (m) => m.SellersModule
              ),
          },
          {
            path: 'shipping-orders',
            loadChildren: () =>
              import('@generators-nx-meetup/shipping-order').then(
                (m) => m.ShippingOrderModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
