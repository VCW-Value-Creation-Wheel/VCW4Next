import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, } from '@angular/core';
import {Observable} from 'rxjs';
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {faChevronDown, faChevronUp, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ControlValueAccessor} from '@angular/forms';
import {Option} from '@core';

@Component({
  selector: 'app-multiple-select-input',
  templateUrl: './multiple-select-input.component.html',
  styleUrls: ['./multiple-select-input.component.scss'],
})
export class MultipleSelectInputComponent implements OnInit, ControlValueAccessor{
  @Input() label = 'Input label';
  @Input() required = false;
  @Input() options: Array<Option> = [];
  @Input() placeholder!: string;
  @Input() defaultValue?: string;
  @Input() isDisabled = false;
  @Input() value?: number | string | boolean | null;
  @Input() id!: string;
  @Output() propagate = new EventEmitter();
  isOpen = false;
  selectedOption?: string;
  iconUp: IconDefinition = faChevronDown;
  iconDown: IconDefinition = faChevronUp;
  constructor() { }

  registerOnTouched() {
  }

  registerOnChange(fn: any) {
    this.propagateChange = fn;
    this.selectedOption = undefined ;
    this.options.map((option) => {
      option.checked = false;
    });
  }

  writeValue(value: any = null) {
    this.value = value;
  }

  private propagateChange = (_: any) => {
  }

  propagateSelected() {
    this.propagateChange(this.value);
    this.propagate.emit({value: this.value, id: this.id});
  }

  ngOnInit(): void {
  }

  selectItem(id: number, $event: MouseEvent) {
    this.options.map( (option, index ) => {
      if (index === id){
        option.checked = !option.checked;
        this.selectedOption = option.label as string;
        if (option.checked){
          this.value = option.value;
          this.propagateSelected();
        }
      }else{
        option.checked = false;
      }
    });
    this.isOpen = false;
  }

  handleClick(){
    !this.isDisabled ? this.isOpen = !this.isOpen : '';
  }
}
