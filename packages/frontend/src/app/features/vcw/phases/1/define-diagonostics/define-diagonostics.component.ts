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
import { environment } from '../../../../../../environments/environment';

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

  useMocks: boolean;

  actionConfirmTitle: string;
  actionConfirmText: string;
  actionConfirm$: Subject<boolean> = new Subject();

  swotTabs = [
    'Strengths',
    'Weaknesses',
    'Opportunities',
    'Threats'
  ];

  swotfieldNames = {
    0: 'strength',
    1: 'weakness',
    2: 'opportunity',
    3: 'threat'
  };

  swotfieldTabNumbers = {
    strength: 0,
    weakness: 1,
    opportunity: 2,
    threat: 3
  };

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
    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getDiagnostics(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {
        data.forEach(dataItem => {
          dataItem.swotField = this.swotfieldTabNumbers[dataItem.swotField];
          this.dataFormArray.push(this.formBuilder.group(swotFieldRowConfig));
          this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(dataItem);
        });
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
        .during(2000).show();
      });
    }

    // mocks! Remove after back-end integration is implemented
    if (this.useMocks) {
      this.mockService.getSwotFieldRows().pipe(take(1)).subscribe(data => {
        data.forEach(d => {
          this.dataFormArray.push(this.formBuilder.group(swotFieldRowConfig));
          this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(d);
        });
      });
    }
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
        if (this.useMocks) {
          this.dataFormArray.removeAt(index);
          this.snackbarService.success('Success!', 'The selected row was deleted.')
          .during(2000).show();
        } else {
          this.vcwPhasesService.deleteDiagnostic(this.vcwId, this.projectId, rowIdControl.value)
          .pipe(take(1))
          .subscribe(response => {
            this.dataFormArray.removeAt(index);
            this.snackbarService.success('Success!', 'The selected row was deleted.')
            .during(2000).show();
          }, error => {
            this.snackbarService.danger('Error', 'Unable to delete the requested row. Try again later.')
            .during(2000).show();
          });
        }
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
      this.dataForm.controls.swotField.setValue(this.swotfieldNames[this.activeTab]);
      if (this.dataForm.valid) {
        if (this.useMocks) {
          this.dataFormArray.push(this.dataForm);
          this.itemDialogOpen = false;
          this.simpleInputOpen = false;
          this.snackbarService.success('Success!', 'New row added.')
          .during(2000).show();
        } else {
          this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.dataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.dataForm.controls.id.setValue(response.id);
            this.dataForm.controls.swotField.setValue(this.swotfieldTabNumbers[response.swotField]);
            this.dataFormArray.push(this.dataForm);
            this.itemDialogOpen = false;
            this.simpleInputOpen = false;
            this.snackbarService.success('Success!', 'New row added.')
            .during(2000).show();
          }, error => {
            this.dataForm.controls.swotField.disable({onlySelf: true});
            this.dataForm.controls.swotField.setValue(null);
            this.snackbarService.danger('Error', 'Unable to create new row. Try again later.')
            .during(2000).show();
          });
        }
      } else {
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(2000).show();
      }

    } else {
      this.dataForm.controls.swotField.enable({onlySelf: true});
      if (this.dataForm.valid) {
        if (this.useMocks) {
          this.editRowMode = false;
          this.itemDialogOpen = false;
          this.dataFormArray.at(this.editRowIndex).patchValue(this.dataForm.value);
          this.snackbarService.success('Success!', 'Your changes were saved.')
          .during(2000).show();
        } else {
          this.dataForm.controls.id.enable({onlySelf: true});
          this.dataForm.controls.swotField.setValue(
            this.swotfieldNames[this.dataFormArray.at(this.editRowIndex).get('swotField').value]
          );
          const id = this.dataFormArray.at(this.editRowIndex).get('id').value;
          this.dataForm.controls.id.setValue(id);
          this.vcwPhasesService.editDiagnostic(this.vcwId, this.projectId, id, this.dataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.editRowMode = false;
            this.itemDialogOpen = false;
            this.dataForm.controls.swotField.setValue(this.swotfieldTabNumbers[response.swotField]);
            this.dataFormArray.at(this.editRowIndex).patchValue(this.dataForm.value);
            this.snackbarService.success('Success!', 'Your changes were saved.')
            .during(2000).show();
          }, error => {
            this.dataForm.controls.swotField.disable({onlySelf: true});
            this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
            .during(2000).show();
          });
        }
      } else {
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(2000).show();
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
    this.dataForm.controls.swotField.setValue(this.swotfieldNames[this.activeTab]);
    if (this.dataForm.valid) {
      if (this.useMocks) {
        this.dataFormArray.push(this.dataForm);
        this.simpleInputOpen = false;
        this.snackbarService.success('Success!', 'New row added.')
        .during(2000).show();
      } else {
        this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.dataForm.value)
        .pipe(take(1))
        .subscribe((response) => {
          this.dataForm.controls.id.setValue(response.id);
          this.dataForm.controls.swotField.setValue(this.swotfieldTabNumbers[response.swotField]);
          this.dataFormArray.push(this.dataForm);
          this.simpleInputOpen = false;
          this.snackbarService.success('Success!', 'New row added.')
          .during(2000).show();
        }, error => {
          this.dataForm.controls.swotField.disable({onlySelf: true});
          this.dataForm.controls.swotField.setValue(null);
          this.snackbarService.danger('Error', 'Unable to create new row. Try again later.')
          .during(2000).show();
        });
      }
    }
  }

  onOpenDialog() {
    this.itemDialogOpen = true;
  }

  getSwotFieldRowsNumber(swotField: number) {
    return this.dataFormArray.controls.filter((c: any) => c.controls.swotField.value === swotField).length;
  }

  /*

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
