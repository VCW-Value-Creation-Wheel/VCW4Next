import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class CheckboxInputComponent implements OnInit, ControlValueAccessor {
  @Input() required: boolean = false;
  @Input() label?: string;

  @Input() identifier!: string;
  @Input() disabled: boolean = false;
  @Input('value') _value?: any = '';
  @Input() helperText?: string;
  @Input() error: boolean = false;
  @Input() isChecked: boolean = false;

  @Output() state = new EventEmitter<boolean>();
  @Output() propagate = new EventEmitter();

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

  onClick() {
    this.isChecked = !this.isChecked;
    this.state.emit(this.isChecked);

    this.propagate.emit({
      value: this.value,
      checked: this.isChecked,
      label: this.label
    });
  }


}
