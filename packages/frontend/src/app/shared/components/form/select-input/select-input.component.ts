import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2} from '@angular/core';
import {NG_VALUE_ACCESSOR, SelectControlValueAccessor} from '@angular/forms';
import {EventOption, Option} from '@core';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent
  extends SelectControlValueAccessor
  implements OnInit {
  @Input() isDisabled = false;
  @Input() label = 'Input label';
  @Input() placeholder?: string;
  @Input() defaultValue: string | number | null = null;
  @Input() defaultValueLabel?: string;
  @Input() id!: string;
  @Input() options: Option[] | null = [];
  @Input() required = false;
  @Input() helperText?: string;
  @Input() error = false;

  @Output() emitInputChange = new EventEmitter<EventOption>();

  constructor(private render: Renderer2, private elementRef: ElementRef) {
    super(render, elementRef);
  }

  ngOnInit(): void {
    if (this.defaultValue) {
      this.value = this.defaultValue;
      this.handleInputChange(this.value);
    }
  }

  handleInputChange(value: EventOption['value']) {
    this.emitInputChange.emit({value, id: this.id});
  }

  disabledClass() {
    return {
      'bg-gray-100 border border-gray-200 cursor-not-allowed': this.isDisabled,
      'bg-gray-200': !this.isDisabled,
    };
  }
}
