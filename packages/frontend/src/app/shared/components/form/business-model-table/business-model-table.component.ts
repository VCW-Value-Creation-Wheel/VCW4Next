import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-business-model-table',
  templateUrl: './business-model-table.component.html',
  styleUrls: ['./business-model-table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BusinessModelTableComponent),
      multi: true,
    },
  ],
})
export class BusinessModelTableComponent {

  @Input() icon;
  @Input() label;
  @Input() rows = 5;
  @Input('value') _value?: any = '';  

  faLink = faLink;

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: string): void {
    if (value) { this._value = value; }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
