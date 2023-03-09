import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { InputMap, Option } from '@core';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss']
})
export class CreateItemDialogComponent implements OnInit {

  @Input() title?: string;
  @Input() formGroup: UntypedFormGroup;
  @Input() isEditing = false;
  @Input() tabs: string[] = [];
  @Input() tabFormControlsToExclude: {[key: number]: string[]} = {};
  @Input() fileFormFieldName = 'file';
  @Input() checkboxes: string[] = [];
  @Input() checkboxFormControl?: string;
  @Input() checkboxCategoryLabel?: string;
  @Input() isAwaitingAction = false;
  @Input() inputTypes: InputMap = {};
  @Input() inputHelperLabel: InputMap = {};

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  activeTab = 0;
  checkedBox: number;
  originalFormValues: {[key: string]: any} = {};

  nestedFormFields: Map<string, string[]> = new Map();

  constructor() {}

  ngOnInit(): void {
    this.changeActiveTab(0);
    const controls: string[] = Object.keys(this.formGroup.controls);
    controls.forEach(control => {
      if (this.hasNestedForm(control)) {
        const fields = Object.keys((this.formGroup.controls[control] as FormGroup).controls);
        this.nestedFormFields.set(control, fields);
      }
    });
    if (this.isEditing) {
      controls.forEach((control) => {
        if (control === this.checkboxFormControl) {
          this.checkedBox = this.checkboxes.indexOf(this.formGroup.controls[control].value);
        }
        this.originalFormValues[control] = this.formGroup.controls[control].value;
      });
    }
  }

  get formFields(): string[] {
    const controls: string[] = Object.keys(this.formGroup.controls);
    return controls.filter(control => !this.isFormfieldDisabled(control) && control !== this.checkboxFormControl);
  }

  formatFieldLabel(fieldName: string): string {
    if (this.inputHelperLabel[fieldName]) {
      return fieldName.split(/(?=[A-Z])/).join(' ') + ` (${this.inputHelperLabel[fieldName]})`;
    } else {
      return fieldName.split(/(?=[A-Z])/).join(' ');
    }
  }

  isTabActive(index: number): boolean {
    return index === this.activeTab;
  }

  changeActiveTab(index: number) {
    this.activeTab = index;
    let excludeControls: string[] = [];
    let enableControls: string[] = [];
    if (Object.keys(this.tabFormControlsToExclude).includes(this.activeTab.toString())) {
      excludeControls = this.tabFormControlsToExclude[this.activeTab];
      enableControls = this.tabFormControlsToExclude[this.activeTab === 0 ? 1 : 0];
    }
    if (enableControls) {
      enableControls.forEach((control) => {
        this.formGroup.controls[control].enable({onlySelf: true});
      });
    }
    if (excludeControls) {
      excludeControls.forEach((control) => {
        this.formGroup.controls[control].disable({onlySelf: true});
        this.formGroup.controls[control].setValue(null);
      });
    }
  }

  onCheckboxCheck(event: Option, index: number) {
    this.checkedBox = index;
    this.formGroup.controls[this.checkboxFormControl].setValue(event.value);
  }

  isBoxChecked(index: number): boolean {
    return index === this.checkedBox;
  }

  isFormfieldDisabled(control: string): boolean {
   return this.formGroup.controls[control].disabled;
  }

  hasNestedForm(control: string): boolean {
    return this.formGroup.controls[control].value instanceof Object;
  }

  onCancel() {
    if (!this.isEditing) {
      this.clearFormFields();
    } else {
      this.restoreFormFields();
    }
    this.cancel.emit();
  }

  onConfirm() {
    this.formGroup.updateValueAndValidity();
    this.confirm.emit();
  }

  clearFormFields() {
    const controls: string[] = Object.keys(this.formGroup.controls);
    controls.forEach(control => {
      if (this.hasNestedForm(control)) {
        this.nestedFormFields.get(control).forEach(field => {
          (this.formGroup.controls[control] as FormGroup).controls[field].setValue(null);
        });
      } else {
        this.formGroup.controls[control].setValue(null);
      }
    });
  }

  restoreFormFields() {
    const controls: string[] = Object.keys(this.formGroup.controls);
    controls.forEach(control => {
      this.formGroup.controls[control].setValue(this.originalFormValues[control]);
    });
  }

  getInputType(fieldName: string): string {
    if (this.inputTypes[fieldName]) {
      return this.inputTypes[fieldName];
    } else {
      return 'text';
    }
  }

  getNestedFields(fieldName: string): string[] {
    if (this.nestedFormFields.has(fieldName)) {
      return this.nestedFormFields.get(fieldName);
    } else {
      return [];
    }
  }

}
