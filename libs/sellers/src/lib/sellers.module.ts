import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellersRoutingModule } from './sellers-routing.module';
import { SellerListComponent } from './pages/seller-list/seller-list.component';

@NgModule({
  imports: [CommonModule, SellersRoutingModule],
  declarations: [SellerListComponent],
})
export class SellersModule {}
