/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import {FlavorsResolver} from "./flavors.resolver";
import {FlavorService} from "../../service/flavor/flavor.service";
import Spy = jasmine.Spy;
import {Observable} from "rxjs";


describe('FlavorsResolver', () => {

  let flavorService: FlavorService;
  let flavorsResolver: FlavorsResolver;

  let flavors = [
    {
      'title': 'Amarena',
      'description': 'Ce parfum associe la crème onctueuse à la délicate saveur de l’Amarena',
      'cover': 'assets/img/flavor/amarena.jpg'
    }, {
      'title': 'Agrumes Bio de Sicile',
      'description': 'Un sorbet Bio élaboré à partir de ce que la nature offre de meilleur',
      'cover': 'assets/img/flavor/agrumi.jpg'
    }
  ];

  beforeEach(() => {
    flavorService = jasmine.createSpyObj('flavorService', ['getFlavors']);
    (flavorService.getFlavors as Spy).and.returnValue(Observable.of(flavors));
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlavorsResolver,
        { provide: FlavorService, useValue: flavorService }
      ]
    });
  });

  it('should be available for DI', inject([FlavorsResolver], (resolver: FlavorsResolver) => {
    expect(resolver).toBeTruthy();
  }));

  it('should resolve flavors', () => {
    /* Given */
    flavorsResolver = TestBed.get(FlavorsResolver);
    /* When  */
    flavorsResolver.resolve(null, null).subscribe(f => {
      /* Then  */
      expect(f).toEqual(flavors);
    });
  });
});
