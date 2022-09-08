import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    DataViewModule,
    RatingModule,
    FormsModule,
    ButtonModule,
  ],
  declarations: [ProductListComponent],
})
export class ProductsModule {}
