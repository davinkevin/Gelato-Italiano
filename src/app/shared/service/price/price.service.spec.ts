/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { PriceService } from './price.service';

describe('PriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceService]
    });
  });

  it('should be available by DI', inject([PriceService], (service: PriceService) => {
    expect(service).toBeTruthy();
  }));

  it('should return coherent price', inject([PriceService], (service: PriceService) => {
    /* Given */
    let sizeToPrice = [
        {size: 'small', price: 3.99},
        {size: 'medium', price: 5.99},
        {size: 'large', price: 7.99},
    ];

    /* When  */
    sizeToPrice.forEach(v => {
      /* Then  */
      expect(service.priceOf(v.size)).toEqual(v.price);
    });
  }));

  it('should return error for incoherent size', inject([PriceService], (service: PriceService) => {
    expect(() => service.priceOf('foo')).toThrow();
  }));

});
