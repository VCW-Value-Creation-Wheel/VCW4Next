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
  @Input() checkboxes: string[] = [];
  @Input() checkboxFormControl?: string;
  @Input() checkboxCategoryLabel?: string;

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  tabs = ['Manual', 'From File'];
  tabControlsToExclude = {
    0: ['file'],
    1: ['name']
  };
  activeTab = 0;
  checkedBox: number;
  activeFormFields: string[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.changeActiveTab(0);
    if (this.checkboxFormControl && this.checkboxFormControl !== '') {
      this.formGroup.addControl(this.checkboxFormControl, this.formBuilder.control(null));
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
    const excludeControls: string[] = this.tabControlsToExclude[this.activeTab];
    const enableControls: string[] = this.tabControlsToExclude[this.activeTab === 0 ? 1 : 0];
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
    this.cancel.emit();
  }

  onConfirm() {
    console.log(this.formGroup)
    this.confirm.emit();
  }

}
