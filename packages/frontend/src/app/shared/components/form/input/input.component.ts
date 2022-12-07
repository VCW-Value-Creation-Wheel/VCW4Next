import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {EventOption} from '@core';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
//TODO add Form accessor
export class InputComponent implements OnInit, OnChanges {
  faInfoCircle = faInfoCircle

  @Input() maxLength: number = 524288
  @Input() inputClass: NgClass['ngClass'] = '';
  @Input() label?: string;
  @Input() autocomplete: string = 'on';
  @Input() placeholder: string = 'Input placeholder';
  @Input() id!: string;
  @Input() inputType: string = 'text';
  @Input() inputStep?: string | number;
  @Input() isDisabled: boolean = false;
  @Input('value') _value?: string | number = '';
  @Input() helperText?: string;
  @Input() error: boolean = false;
  @Input() focusRig: boolean = true;
  @Input() required?: boolean;
  @Input() pattern?: string;
  @Output() emitInputChange = new EventEmitter<EventOption>();


  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isDisabled){
      this.value = undefined;
      // this.propagateSelected()
    }
  }

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
    if (value) this._value = value;
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

  wrapperClass() {
    return { 'gap-2': this.label };
  }
}
