import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PhaseNavigationService,
  SnackbarService,
  swotFieldRowConfig,
  VcwPhasesService
} from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus, faMinus, faTimes, faFloppyDisk, faCheck, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
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
  faCheck = faCheck;
  faWindowMaximize = faWindowMaximize;
  faFloppyDisk = faFloppyDisk;

  activeTab = 0;
  vcwId: number;
  projectId: number;

  itemDialogOpen = false;
  editRowMode = false;
  confirmDialogOpen = false;
  simpleInputOpen = false;
  editRowIndex: number;

  actionConfirmTitle: string;
  actionConfirmText: string;
  actionConfirm$: Subject<boolean> = new Subject();

  swotTabs = [
    'Strengths',
    'Weaknesses',
    'Opportunities',
    'Threats'
  ];

  constructor(private formBuilder: FormBuilder,
              private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwPhasesService: VcwPhasesService,
              private snackbarService: SnackbarService,
              private mockService: VcwMockService) {
    this.dataFormArray = this.formBuilder.array([]);
  }


  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);

    this.vcwPhasesService.getDiagnostics(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {

      data.forEach(dataItem => {
        this.dataFormArray.push(this.formBuilder.group(swotFieldRowConfig));
        this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(dataItem);
      });
    }, error => {
      this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
      .during(5000).show();
    });

    // mocks! Remove after back-end integration is implemented
    // this.mockService.getSwotFieldRows().pipe(take(1)).subscribe(data => {
    //   console.log(this.vcwId)
    //   data.forEach(d => {
    //     this.dataFormArray.push(this.formBuilder.group(swotFieldRowConfig));
    //     this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(d);
    //   });
    // });
  }

  changeTab(index: number) {
    this.activeTab = index;
  }

  onAddRow() {
    this.dataForm = this.formBuilder.group(swotFieldRowConfig);
    this.simpleInputOpen = true;
    this.dataForm.controls.swotField.disable({onlySelf: true});
  }

  editRow(index: number) {
    this.editRowMode = true;
    this.itemDialogOpen = true;
    this.dataForm = this.formBuilder.group(swotFieldRowConfig);
    this.dataForm.patchValue(this.dataFormArray.at(index).value);
    this.editRowIndex = index;
  }

  deleteRow(index: number, rowNameControl: AbstractControl, rowIdControl: AbstractControl) {
    this.actionConfirmTitle = 'Delete Row';
    this.actionConfirmText = `Are you sure you want to delete the row "${rowNameControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        this.vcwPhasesService.deleteDiagnostic(this.vcwId, this.projectId, rowIdControl.value)
        .pipe(take(1))
        .subscribe(response => {
          this.dataFormArray.removeAt(index);
        }, error => {
          this.snackbarService.danger('Error', 'Unable to delete the requested row. Try again later.')
          .during(5000).show();
        });
      }
    });
  }

  onCancel() {
    this.itemDialogOpen = false;
    this.simpleInputOpen = false;
  }

  onConfirm() {
    if (!this.editRowMode) {
      this.dataForm.controls.swotField.enable({onlySelf: true});
      this.dataForm.controls.swotField.setValue(this.activeTab);
      if (this.dataForm.valid) {
        this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.dataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.dataFormArray.push(this.dataForm);
          this.itemDialogOpen = false;
          this.simpleInputOpen = false;
        }, error => {
          this.dataForm.controls.swotField.disable({onlySelf: true});
          this.dataForm.controls.swotField.setValue(null);
          this.snackbarService.danger('Error', 'Unable to create new row. Try again later.')
          .during(5000).show();
        });
      } else {
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(5000).show();
      }

    } else {
      this.dataForm.controls.swotField.enable({onlySelf: true});
      if (this.dataForm.valid) {
        const id = this.dataForm.controls.id.value;
        this.vcwPhasesService.editDiagnostic(this.vcwId, this.projectId, id, this.dataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.editRowMode = false;
          this.itemDialogOpen = false;
          this.dataFormArray.at(this.editRowIndex).patchValue(this.dataForm.value);
        }, error => {
          this.dataForm.controls.swotField.disable({onlySelf: true});
          this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
          .during(5000).show();
        });
      } else {
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(5000).show();
      }
    }
  }

  onActionCancel() {
    this.actionConfirm$.next(false);
  }

  onActionConfirm() {
    this.actionConfirm$.next(true);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onDirectAdd();
    }
  }

  onDirectAdd() {
    this.dataForm.controls.swotField.enable({onlySelf: true});
    this.dataForm.controls.swotField.setValue(this.activeTab);
    if (this.dataForm.valid) {
      this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.dataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.dataFormArray.push(this.dataForm);
          this.simpleInputOpen = false;
        }, error => {
          this.dataForm.controls.swotField.disable({onlySelf: true});
          this.dataForm.controls.swotField.setValue(null);
          this.snackbarService.danger('Error', 'Unable to create new row. Try again later.')
          .during(5000).show();
        });
    }
  }

  onOpenDialog() {
    this.itemDialogOpen = true;
  }

  getSwotFieldRowsNumber(swotField: number) {
    return this.dataFormArray.controls.filter((c: any) => c.controls.swotField.value === swotField).length;
  }

  /*

  addField(tabId: number) {
    (this.dataForm.controls.swotFields as FormArray).push(
      this.formBuilder.group(swotFieldRowConfig)
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
