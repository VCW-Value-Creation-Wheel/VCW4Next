import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  DatePickerComponent
} from './components';


@NgModule({
  declarations: [
    ButtonComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
