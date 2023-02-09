import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { Option } from '@core';

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

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  activeTab = 0;
  checkedBox: number;
  originalFormValues: {[key: string]: any} = {};

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.changeActiveTab(0);
    if (this.isEditing) {
      const controls: string[] = Object.keys(this.formGroup.controls);
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
    return fieldName.split(/(?=[A-Z])/).join(' ');
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

  onCancel() {
    if (!this.isEditing) {
      this.clearFormFields();
    } else {
      this.restoreFormFields();
    }
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  clearFormFields() {
    const controls: string[] = Object.keys(this.formGroup.controls);
    controls.forEach(control => {
      this.formGroup.controls[control].setValue(null);
    });
  }

  restoreFormFields() {
    const controls: string[] = Object.keys(this.formGroup.controls);
    controls.forEach(control => {
      this.formGroup.controls[control].setValue(this.originalFormValues[control]);
    });
  }

}
