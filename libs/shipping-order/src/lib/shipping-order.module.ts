import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ShippingOrdersRoutingModule } from './shipping-orders-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

@NgModule({
  imports: [CommonModule, ShippingOrdersRoutingModule, TableModule],
  declarations: [OrdersListComponent],
})
export class ShippingOrderModule {}
