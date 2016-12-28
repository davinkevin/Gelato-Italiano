import { Injectable } from '@angular/core';

@Injectable()
export class PriceService {

  constructor() {}

  priceOf(size: string): number {
    switch (size) {
      case 'small':
        return 3.99;
      case 'medium':
        return 5.99;
      case 'large':
        return 7.99;
      default:
        throw new TypeError(`${size} is not a valid size`);
    }
  }
}
