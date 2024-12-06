import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IAngularMyDpOptions,
  IMyDateModel,
  IMyDateRangeModel,
  IMySingleDateModel,
} from 'angular-mydatepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() id = 'datePickerID';
  @Input() label = 'datePickerID';
  @Input() name = 'datePickerName';
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() isDateRange?: boolean;
  @Output() selectedDate = new EventEmitter<
    IMySingleDateModel | IMyDateRangeModel
  >();
  myDpOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd/mm/yyyy',
  };
  model?: IMyDateModel;

  constructor() {}

  ngOnInit(): void {
    if (this.minDate) {
      this.minDate = new Date(this.minDate);
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.myDpOptions.disableUntil = {
        year: this.minDate.getFullYear(),
        month: this.minDate.getMonth() + 1,
        day: this.minDate.getDate(),
      };
      this.myDpOptions.dateRange = this.isDateRange
    }
    if (this.maxDate) {
      this.maxDate = new Date(this.maxDate);
      this.maxDate.setDate(this.maxDate.getDate() + 1);
      this.myDpOptions.disableSince = {
        year: this.maxDate.getFullYear(),
        month: this.maxDate.getMonth() + 1,
        day: this.maxDate.getDate(),
      };
    }
  }

  onDateChanged(event: IMyDateModel): void {
    if (event.isRange) {
      this.selectedDate.emit(event.dateRange);
    } else {
      this.selectedDate.emit(event.singleDate);
    }
  }
}
