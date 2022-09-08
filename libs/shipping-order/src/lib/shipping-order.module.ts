import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShippingOrdersRoutingModule } from './shipping-orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

@NgModule({
  imports: [CommonModule, ShippingOrdersRoutingModule],
  declarations: [OrdersListComponent],
})
export class ShippingOrderModule {}
