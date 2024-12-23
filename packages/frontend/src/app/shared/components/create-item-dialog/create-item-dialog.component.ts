import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { CheckboxItemInput, InputMap, MinMaxMap, Option } from '@core';

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
  @Input() checkboxes: CheckboxItemInput[] = [];
  @Input() checkboxFormControl?: string;
  @Input() checkboxCategoryLabel?: string;
  @Input() isAwaitingAction = false;
  @Input() inputTypes: InputMap = {};
  @Input() inputHelperLabel: InputMap = {};
  @Input() disableEditing: InputMap = {};
  @Input() inputMinMaxValues: MinMaxMap = {}

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
          const value = this.formGroup.controls[control].value;
          this.checkedBox = this.checkboxes.map(item => item.value).indexOf(value);
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
    if (event.checked) {
      this.checkedBox = index;
      this.formGroup.controls[this.checkboxFormControl].setValue(event.value);
    } else {
      this.checkedBox = undefined;
      this.formGroup.controls[this.checkboxFormControl].setValue(null);
    }
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

  isFieldEditDisabled(fieldName: string): boolean {
    if (this.disableEditing[fieldName]) {
      return this.disableEditing[fieldName];
    } else {
      return false;
    }
  }

  getMinValue(fieldName: string): number {
    if (this.inputMinMaxValues[fieldName]) {
      return this.inputMinMaxValues[fieldName].min;
    } else {
      return undefined;
    }
  }

  getMaxValue(fieldName: string): number {
    if (this.inputMinMaxValues[fieldName]) {
      return this.inputMinMaxValues[fieldName].max;
    } else {
      return undefined;
    }
  }

  keyPressHandler(event: KeyboardEvent, fieldName: string) {
    if (this.getInputType(fieldName) === 'number') {
      if (this.getMaxValue(fieldName) !== undefined && 
        this.formGroup.get(fieldName).value > this.getMaxValue(fieldName)) {
          this.formGroup.get(fieldName).patchValue(this.getMaxValue(fieldName));
      }
      if (this.getMinValue(fieldName) !== undefined && 
          this.formGroup.get(fieldName).value < this.getMinValue(fieldName)) {
            this.formGroup.get(fieldName).patchValue(this.getMinValue(fieldName));
      }
    }
  }

}
