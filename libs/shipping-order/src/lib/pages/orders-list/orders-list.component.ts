import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models';
import { OrdersService } from '../../services/orders.service';
@Component({
  selector: 'generators-nx-meetup-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  customers: Customer[] = [];
  loading: boolean = true;
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().then((customers) => {
      this.customers = customers;
      this.loading = false;
    });
  }
}
