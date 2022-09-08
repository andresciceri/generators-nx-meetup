import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'list',
        component: ProductListComponent,
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
