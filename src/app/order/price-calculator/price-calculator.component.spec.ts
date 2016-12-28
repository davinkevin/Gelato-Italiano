/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, SimpleChange} from '@angular/core';

import { PriceCalculatorComponent } from './price-calculator.component';
import {PriceService} from "../../shared/service/price/price.service";
import {IceCream} from "../ice-cream-creator/ice-cream.interface";
import Spy = jasmine.Spy;

describe('PriceCalculatorComponent', () => {
  let component: PriceCalculatorComponent;
  let fixture: ComponentFixture<PriceCalculatorComponent>;
  let el: DebugElement;

  let priceService: PriceService;
  beforeEach(() => {
    priceService = jasmine.createSpyObj('priceService', ['priceOf']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCalculatorComponent ],
      providers: [ { provide: PriceService, useValue: priceService }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCalculatorComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.iceCreams = [];

    fixture.autoDetectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the total price', async(() => {
    /* Given */
    let iceCreams = [{size: 'small'}, {size: 'large'}, {size: 'medium'}] as IceCream[];
    let simpleChange = new SimpleChange([], iceCreams);
    (priceService.priceOf as Spy).and.returnValue(1);

    /* When  */
    component.ngOnChanges({iceCreams: simpleChange});

    /* Then  */
    expect(component.total).toEqual(3);
    expect(priceService.priceOf).toHaveBeenCalledTimes(3);
  }));
});
