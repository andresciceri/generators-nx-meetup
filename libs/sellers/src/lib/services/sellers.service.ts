import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Seller } from '../models';

@Injectable({ providedIn: 'root' })
export class SellerService {
  constructor(private http: HttpClient) {}

  getCustomersLarge() {
    return this.http
      .get<any>('assets/api/customers-large.json')
      .toPromise()
      .then((res) => res.data as Seller[])
      .then((data) => data);
  }
}
