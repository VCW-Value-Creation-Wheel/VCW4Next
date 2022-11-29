import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DynamicInputBase } from '../classes/dynamic-input-base';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faDrawPolygon,
  faMapPin,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  IMyDate,
  IMyDateRangeModel,
  IMySingleDateModel,
} from 'angular-mydatepicker';
import { format } from 'date-fns';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss'],
})
export class DynamicInputComponent implements OnInit {
  @Input() input!: DynamicInputBase<any>;
  @Input() form!: UntypedFormGroup;

  faDrawPolygon: IconDefinition = faDrawPolygon;
  faMapPin: IconDefinition = faMapPin;
  faPencil: IconDefinition = faPencilAlt;

  constructor() {}

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }

  ngOnInit() {}

  onSelectDate(date: IMySingleDateModel | IMyDateRangeModel) {
    const dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ss';
    if (
      'beginJsDate' in date &&
      'endJsDate' in date &&
      date.beginJsDate &&
      date.endJsDate
    ) {
      const beginDate = format(new Date(date.beginJsDate), dateFormat);
      const endDate = format(new Date(date.endJsDate), dateFormat);
      this.form.get(this.input.key)?.setValue(`${beginDate},${endDate}`);
    } else if ('jsDate' in date && date.jsDate) {
      const selectedDate = format(new Date(date.jsDate), dateFormat);
      this.form.get(this.input.key)?.setValue(selectedDate);
    }
  }

  onButtonClink(action: string, value?: string) {}
}
