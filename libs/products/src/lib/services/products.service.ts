import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<any>('assets/api/products.json')
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }
}
