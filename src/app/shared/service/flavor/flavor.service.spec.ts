/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {FlavorService, Flavor} from './flavor.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
  BaseRequestOptions, Http, XHRBackend, HttpModule, Response, ResponseOptions,
  RequestMethod
} from '@angular/http';

describe('FlavorService', () => {

  let rootUrl = '/api/flavors';
  let flavorService: FlavorService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          FlavorService, MockBackend, BaseRequestOptions,
        {
          provide: Http, deps: [MockBackend, BaseRequestOptions],
          useFactory: (b: XHRBackend, o: BaseRequestOptions) => new Http(b, o)
        }
      ],
      imports: [HttpModule]
    });

    mockBackend = TestBed.get(MockBackend);
    flavorService = TestBed.get(FlavorService);
  });

  it('should query the back-end to fetch all flavors', () => {
    /* Given */
    let body: Flavor[] = [{title: 'foo', description: 'desc foo', cover: 'assets/foo.jpg'}];
    let conn: MockConnection;

    mockBackend.connections.subscribe((c: MockConnection) => {
      c.mockRespond(new Response(new ResponseOptions({body})));
      conn = c;
    });

    /* When */
    flavorService.getFlavors().subscribe(flavors => {
      expect(flavors).toEqual(body);
    });

    /* Then */
    expect(conn.request.method).toEqual(RequestMethod.Get);
    expect(conn.request.url).toEqual(rootUrl);
  });
});
