import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Customer } from '../models';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http
      .get<any>('assets/api/orders.json')
      .toPromise()
      .then((res) => res as Customer[])
      .then((data) => data);
  }
}
