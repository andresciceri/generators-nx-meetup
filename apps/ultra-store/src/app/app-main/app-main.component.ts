import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'generators-nx-meetup-app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss'],
})
export class AppMainComponent implements OnInit {
  items: MenuItem[];
  constructor() {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Productos', icon: 'pi pi-tags', routerLink: 'products/list' },
      {
        label: 'Pedidos',
        icon: 'pi pi-book',
        routerLink: 'shipping-orders/list',
      },
      { label: 'Vendedores', icon: 'pi pi-users', routerLink: 'sellers/list' },
    ];
  }
}
