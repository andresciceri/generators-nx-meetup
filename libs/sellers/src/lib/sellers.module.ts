import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SellersRoutingModule } from './sellers-routing.module';
import { SellerListComponent } from './pages/seller-list/seller-list.component';

@NgModule({
  imports: [CommonModule, SellersRoutingModule, TableModule],
  declarations: [SellerListComponent],
})
export class SellersModule {}
