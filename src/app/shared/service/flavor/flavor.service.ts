import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

export interface Flavor {
  title: string;
  name: string;
  description: string;
  cover: string;
}

@Injectable()
export class FlavorService {

  constructor(private http: Http) {}

  getFlavors(): Observable<Flavor[]> {
    return this.http.get('/api/flavors')
        .map(res => res.json() as Flavor[]);
  }

}
