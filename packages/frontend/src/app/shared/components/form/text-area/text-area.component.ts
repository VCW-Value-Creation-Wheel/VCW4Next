import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventOption } from '@core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent implements OnInit {
  @Input() textAreaClass = '';
  @Input() rows = 5;
  @Input() label = 'Input label';
  @Input() placeholder = 'Input placeholder';
  @Input() id!: string;
  @Input() disabled = false;
  @Input('value') _value?: string | number = '';
  @Input() helperText?: string;
  @Input() error = false;
  @Input() required = false;

  @Output() emitInputChange = new EventEmitter<EventOption>();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  ngOnInit(): void {}

  writeValue(value: string): void {
    if (value) { this._value = value; }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInputChange(value: EventOption['value']) {
    this.emitInputChange.emit({ value, id: this.id });
  }
}
