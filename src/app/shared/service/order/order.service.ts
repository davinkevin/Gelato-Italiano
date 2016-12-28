import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Order} from './order.interface';
import {Observable} from 'rxjs';

@Injectable()
export class OrderService {

  constructor(private http: Http) {}

  create(order: Order): Observable<Order> {
    return this.http
        .post('/api/orders', order)
        .map(r => r.json());
  }

}
