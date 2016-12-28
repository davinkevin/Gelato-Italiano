import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {IceCream} from '../ice-cream-creator/ice-cream.interface';
import {PriceService} from '../../shared/service/price/price.service';

@Component({
  selector: 'gi-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss']
})
export class PriceCalculatorComponent implements OnChanges {

  @Input() iceCreams: IceCream[];
  total: number;

  constructor(private priceService: PriceService) {}

  ngOnChanges({iceCreams}: SimpleChanges): void {
    this.total = iceCreams
        .currentValue
        .map(i => this.priceService.priceOf(i.size))
        .reduce((prev, current) => prev + current, 0);
  }
}
