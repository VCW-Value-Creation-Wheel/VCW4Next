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
  HelperTextComponent,
  NavbarComponent,
  FooterComponent,
  SearchBarComponent,
  ProjectCardComponent,
  PhaseNavigationComponent,
  TabComponent,
  DialogComponent,
  SnackbarComponent
} from './components';
import { RegexInputDirective } from './directives';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { VcwCardComponent } from './components/vcw-card/vcw-card.component';
import { CkeEditorComponent } from './components/form/cke-editor/cke-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ListItemComponent } from './components/list-item/list-item.component';
import { CreateItemDialogComponent } from './components/create-item-dialog/create-item-dialog.component';
import { SimpleItemInputComponent } from './components/simple-item-input/simple-item-input.component';
import { BusinessModelTableComponent } from './components/form/business-model-table/business-model-table.component';
import { ChartGraphicComponent } from './components/form/chart-graphic/chart-graphic.component';
import { TableComponent } from './components/form/table/table.component';


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
    HelperTextComponent,
    RegexInputDirective,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    ProjectCardComponent,
    PhaseNavigationComponent,
    TabComponent,
    DialogComponent,
    VcwCardComponent,
    CkeEditorComponent,
    BusinessModelTableComponent,
    ListItemComponent,
    CreateItemDialogComponent,
    SnackbarComponent,
    SimpleItemInputComponent,
    ChartGraphicComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMyDatePickerModule,
    NgSelectModule,
    AngularSvgIconModule,
    CKEditorModule
  ],
  exports: [
    FontAwesomeModule,
    NavbarComponent,
    FooterComponent,
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
    HelperTextComponent,
    RegexInputDirective,
    NavbarComponent,
    FooterComponent,
    SearchBarComponent,
    IconButtonComponent,
    ButtonComponent,
    ProjectCardComponent,
    PhaseNavigationComponent,
    TabComponent,
    DialogComponent,
    VcwCardComponent,
    CkeEditorComponent,
    BusinessModelTableComponent,
    ListItemComponent,
    CreateItemDialogComponent,
    SnackbarComponent,
    SimpleItemInputComponent,
    ChartGraphicComponent,
    TableComponent
  ]
})
export class SharedModule { }
