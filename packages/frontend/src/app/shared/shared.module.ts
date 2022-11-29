import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ButtonComponent,
  DatePickerComponent,
  CheckboxInputComponent,
  CustomSelectInputComponent,
  DynamicInputComponent,
  InputComponent,
  InputFileComponent,
  SelectComponent,
  SelectInputComponent,
  TextAreaComponent,
  MultipleSelectInputComponent,
  IconButtonComponent,
  HelperTextComponent
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ButtonComponent,
    DatePickerComponent,
    CheckboxInputComponent,
    CustomSelectInputComponent,
    DynamicInputComponent,
    InputComponent,
    InputFileComponent,
    SelectComponent,
    SelectInputComponent,
    TextAreaComponent,
    MultipleSelectInputComponent,
    IconButtonComponent,
    HelperTextComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
    NgSelectModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class SharedModule { }
