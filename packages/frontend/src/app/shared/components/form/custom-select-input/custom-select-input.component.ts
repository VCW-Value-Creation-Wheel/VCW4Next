import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Option } from '@core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-select-input',
  templateUrl: './custom-select-input.component.html',
  styleUrls: ['./custom-select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectInputComponent),
      multi: true,
    },
  ],
})
export class CustomSelectInputComponent implements OnInit, ControlValueAccessor, OnChanges {
  @Input() label = 'Input label';
  @Input() required = false;
  @Input() options: Array<Option> = [];
  @Input() placeholder!: string;
  @Input() defaultValue?: string;
  @Input() isDisabled = false;
  @Input() value?: number | string | boolean | Array<any>;
  @Input() id!: string;
  @Output() propagate = new EventEmitter();
  @Input() multiple = false;
  isOpen = false;
  selectedOption?: Array<Option>;
  iconUp: IconDefinition = faChevronDown;
  iconDown: IconDefinition = faChevronUp;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isDisabled) {
      this.value = undefined;
      this.propagateSelected();
      this.options.map(option => option.checked = false);
    }
  }

  registerOnTouched() {
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
    this.selectedOption = undefined;
    if (this.options) {
      this.options.map((option) => {
        option.checked = false;
      });
    }
  }

  writeValue(value: any = null) {
    this.value = value;
  }

  private propagateChange = (_: any) => {
  }

  propagateSelected() {
    this.propagateChange(this.value);
    this.propagate.emit({ value: this.value, id: this.id });
  }

  ngOnInit(): void {
    if (this.multiple) {
      this.value = [];
    }
  }


  onOptionClick($event: MouseEvent): void {
    const target = $event.target as HTMLInputElement;
    const id = parseInt(target.id);
    if (!this.multiple) {
      this.options.map((option) => {
        option.checked = false;
      });
    }
    this.options[id].checked = !this.options[id].checked;
    this.setValue();
    this.isOpen = false;
  }

  setValue() {
    const checked: Array<string> = [];
    this.options.map(option => {
      if (option.checked) {
        checked.push(option.value);
      }
    });
    if (checked.length === 0) {
      this.value = undefined;
    } else {
      if (this.multiple) {
        this.value = checked;
      } else {
        this.value = checked[0].toString();
      }
    }
    this.propagateSelected();
  }


  handleClick() {
    !this.isDisabled ? this.isOpen = !this.isOpen : '';
  }
}
