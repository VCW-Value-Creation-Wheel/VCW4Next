import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, swotAnalysisConfig, SwotField, swotFieldsConfig } from '@core';
import { faPlus, faMinus, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-define-diagonostics',
  templateUrl: './define-diagonostics.component.html',
  styleUrls: ['./define-diagonostics.component.scss']
})
export class DefineDiagonosticsComponent implements OnInit {

  dataForm: UntypedFormGroup;
  dataFormArray: UntypedFormArray;

  faPlus = faPlus;
  faMinus = faMinus;
  faTimes = faTimes;
  faFloppyDisk = faFloppyDisk;

  activeTab = 0;

  itemDialogOpen = false;
  editFieldMode = false;
  confirmDialogOpen = false;
  editFieldIndex: number;

  actionConfirmTitle: string;
  actionConfirmText: string;
  actionConfirm$: Subject<boolean> = new Subject();

  swotTabs = [
    'Strengths',
    'Weaknesses',
    'Opportunities',
    'Threats'
  ];

  swotFields: SwotField[] = [];

  constructor(private formbuilder: FormBuilder,
              private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.dataFormArray = this.formbuilder.array([]);
  }


  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  changeTab(index: number) {
    this.activeTab = index;
  }

  onAddField() {
    this.dataForm = this.formbuilder.group(swotFieldsConfig);
    this.itemDialogOpen = true;
  }

  editField(index: number) {
    this.editFieldMode = true;
    this.itemDialogOpen = true;
    this.dataForm = this.formbuilder.group(swotFieldsConfig);
    this.dataForm.patchValue(this.dataFormArray.at(index).value);
    this.editFieldIndex = index;
  }

  deleteField(index: number, fieldTitleControl: AbstractControl) {
    this.actionConfirmTitle = 'Delete Row';
    this.actionConfirmText = `Are you sure you want to delete the row "${fieldTitleControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        this.dataFormArray.removeAt(index);
      }
    });
  }

  onCancel() {
    this.itemDialogOpen = false;
  }

  onConfirm() {
    if (!this.editFieldMode) {
      this.dataForm.controls.categoryId.enable({onlySelf: true});
      this.dataForm.controls.categoryId.setValue(this.activeTab);
      this.dataFormArray.push(this.dataForm);
      this.itemDialogOpen = false;
    } else {
      this.editFieldMode = false;
      this.itemDialogOpen = false;
      this.dataFormArray.at(this.editFieldIndex).patchValue(this.dataForm.value);
    }
  }

  onActionCancel() {
    this.actionConfirm$.next(false);
  }

  onActionConfirm() {
    this.actionConfirm$.next(true);
  }

  /*

  addField(tabId: number) {
    (this.dataForm.controls.swotFields as FormArray).push(
      this.formbuilder.group(swotFieldsConfig)
    );

    this.swotFields.push({
      categoryId: tabId,
      title: '',
      description: ''
    });
    ((this.dataForm.controls.swotFields as FormArray).controls[this.swotFields.length - 1] as FormGroup)
      .controls.categoryId.setValue(tabId);
  }

  removeField(fieldId: number) {
    this.swotFields.splice(fieldId, 1);
    (this.dataForm.controls.swotFields as FormArray).removeAt(fieldId);
  }

  getSwotFieldsByCategory(categoryId: number): SwotField[] {
    return this.swotFields.filter(field => field.categoryId === categoryId);
  }

  onSave() {
    
  }

  getValidator(control: string, nestingControl?: string, index?: number): boolean {
    let validator;
    if (nestingControl) {
      validator = (this.dataForm.get(nestingControl) as FormArray).controls[index].get(control)?.validator;
    } else {
      validator = this.dataForm.get(control)?.validator;
    }
    if (validator) {
      const val = validator({} as AbstractControl);
      if (val && val.required) {
          return true;
      }
    }
    return false;
  }

  isFormValid(control: string) {
    let isValid = true;
    (this.dataForm.get(control) as FormArray)?.controls.every((ctrl) => {
      if (ctrl.invalid) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }
  */
}
