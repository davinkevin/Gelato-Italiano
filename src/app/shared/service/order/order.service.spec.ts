/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderService } from './order.service';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, Response, ResponseOptions,
  RequestMethod
} from "@angular/http";
import {Order} from "./order.interface";

describe('OrderService', () => {
  let rootUrl = '/api/orders';
  let orderService: OrderService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderService, MockBackend, BaseRequestOptions,
        {
          provide: Http, deps: [MockBackend, BaseRequestOptions],
          useFactory: (b: XHRBackend, o: BaseRequestOptions) => new Http(b, o)
        }
      ],
      imports: [HttpModule]
    });

    mockBackend = TestBed.get(MockBackend);
    orderService = TestBed.get(OrderService);
  });

  it('should be available by DI', inject([OrderService], (service: OrderService) => {
    expect(service).toBeTruthy();
  }));

  it('should send to the back-end the order', () => {
    /* Given */
    let body : Order = {
      details: {
        name: 'DAVIN Kevin',
        email: 'formation.of.@ngular.com',
      },
      iceCreams : [{size: 'small', flavors: [
            {title: 't', name: 'n', description: 'd', cover: 'c'}
          ]
      }]
    };
    let conn: MockConnection;

    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body})));
      conn = c;
    });

    /* When */
    orderService.create(body).subscribe(o => {
      expect(o).toEqual(body);
    });

    /* Then */
    expect(conn.request.method).toEqual(RequestMethod.Post);
    expect(conn.request.url).toEqual(rootUrl);
  })
});
