import {Component, OnInit, Input, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import {PriceService} from '../../shared/service/price/price.service';
import {FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';

@Component({
  selector: 'gi-price-calculator',
  templateUrl: './price-calculator.component.html',
  styleUrls: ['./price-calculator.component.scss']
})
export class PriceCalculatorComponent implements DoCheck {

  @Input() iceCreams: FormArray;
  total: number;

  constructor(private priceService: PriceService) {}

  ngDoCheck(): void {
    Observable.from(this.iceCreams.controls)
        .filter(i => i.valid)
        .map(c => c.value)
        .map(i => this.priceService.priceOf(i.size))
        .reduce((s, v) => s + v, 0)
        .subscribe(s => this.total = s);
  }
}
