import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'gi-ice-cream-size',
  templateUrl: './ice-cream-size.component.html',
  styleUrls: ['./ice-cream-size.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => IceCreamSizeComponent),
    multi: true
  }]
})
export class IceCreamSizeComponent implements ControlValueAccessor {

  value: string;
  sizes: string[] = ['large', 'medium', 'small'];

  private onModelChange: Function;
  private onTouch: Function;
  focused: string;

  public writeValue(value: string) {
    this.value = value;
  }

  public registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  onChange(value: string) {
    this.value = value;
    this.onModelChange(value);
  }

  onBlur(value: string) {
    this.focused = '';
  }

  onFocus(value: string) {
    this.focused = value;
    this.onTouch();
  }

  capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
}
