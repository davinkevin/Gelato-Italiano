import {Component, OnInit, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Flavor} from '../../../shared/service/flavor/flavor.service';

@Component({
  selector: 'gi-ice-cream-flavors',
  templateUrl: './ice-cream-flavors.component.html',
  styleUrls: ['./ice-cream-flavors.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IceCreamFlavorsComponent),
      multi: true
    }
  ]

})
export class IceCreamFlavorsComponent implements ControlValueAccessor, OnInit {

  flavors: Flavor[];
  value: Flavor[];

  private onModelChange: Function;
  private onTouch: Function;
  focused: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
        .map(d => (<any> d).flavors)
        .subscribe(f => this.flavors = f);
  }

  public registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }
  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }
  public writeValue(flavors: Flavor[]) {
    this.value = flavors;
  }

  updateFlavor(flavor: Flavor) {
    if (this.contains(flavor)) {
      this.value = this.value.filter((x: Flavor) => flavor !== x);
    } else {
      this.value = this.value.concat([flavor]);
    }
    this.onModelChange(this.value);
  }

  contains(flavor: Flavor) {
    return this.value.includes(flavor);
  }

  onBlur(value: any) {
    this.focused = null;
  }

  onFocus(value: any) {
    this.focused = value;
    this.onTouch();
  }
}
