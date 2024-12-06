import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Option} from '@core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  isFocused = false;

  @Input() multiple = false;
  @Input() label!: string;
  @Input() placeholder: string | undefined;
  @Input() id!: string;
  @Input() options: Option[] | null = [];
  @Input() required = false;
  @Input() helperText?: string;
  @Input() error = false;
  @Input() bindLabel = 'label';
  @Input() bindValue = 'value';
  @Input() typeahead: any;
  @Input() minTermLength = 0;
  @Input() virtualScroll = false;
  @Input() value?: number | string | null;
  @Input() clearable = true;
  @Input() groupBy!: string | ((value: any) => any);
  @Input() isDisabled = false;

  @Output() propagate = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  registerOnTouched() {
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  writeValue(value: any = null) {
    this.value = value;
  }

  private propagateChange = (_: any) => {
  };

  propagateSelected() {
    this.propagateChange(this.value);
    this.propagate.emit({value: this.value, id: this.id});
  }
}
