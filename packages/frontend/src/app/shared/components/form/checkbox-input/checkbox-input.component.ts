import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventOption } from '@core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
})
export class CheckboxInputComponent implements OnInit {
  @Input() required = false;
  @Input() leftLabel?: string;
  @Input() rightLabel?: string;
  @Input() identifier!: string;
  @Input() disabled = false;
  @Input('value') _value?: string | number = '';
  @Input() helperText?: string;
  @Input() error = false;
  @Output() emitInputChange = new EventEmitter<EventOption>();

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

  onValueChange(value: EventOption['value']) {
    this.emitInputChange.emit({ value, id: this.identifier });
  }
}
