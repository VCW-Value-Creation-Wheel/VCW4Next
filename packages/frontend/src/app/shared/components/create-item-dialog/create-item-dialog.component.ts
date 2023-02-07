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
  @Input() tabs: string[] = [];
  @Input() checkboxes: string[] = [];
  @Input() checkboxFormControl?: string;
  @Input() checkboxCategoryLabel?: string;

  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  activeTab = 0;
  checkedBox: number;
  formFields;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formFields = Object.keys(this.formGroup.controls);
    if (this.checkboxFormControl && this.checkboxFormControl !== '') {
      this.formGroup.addControl(this.checkboxFormControl, this.formBuilder.control(null));
    }
  }

  formatFieldLabel(fieldName: string): string {
    return fieldName.split(/(?=[A-Z])/).join(' ');
  }

  isTabActive(index: number): boolean {
    return index === this.activeTab;
  }

  changeActiveTab(index: number) {
    this.activeTab = index;
  }

  onCheckboxCheck(event: Option, index: number) {
    this.checkedBox = index;
    this.formGroup.controls[this.checkboxFormControl].setValue(event.value);
  }

  isBoxChecked(index: number): boolean {
    return index === this.checkedBox;
  }

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

}
