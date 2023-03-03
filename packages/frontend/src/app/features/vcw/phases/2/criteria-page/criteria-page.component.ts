import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService, SnackbarService, createCriteriasConfig } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faFloppyDisk, faPlus, faTimes, faCheck, faWindowMaximize, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-criteria-page',
  templateUrl: './criteria-page.component.html',
  styleUrls: ['./criteria-page.component.scss']
})
export class CriteriaPageComponent implements OnInit{
  faFloppyDisk = faFloppyDisk;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faWindowMaximize = faWindowMaximize;

  dataFormArray: UntypedFormArray;
  dataForm: UntypedFormGroup;
  editCriteriaMode = false;
  editCriteriaIndex: number;
  itemDialogOpen = false;
  confirmDialogOpen = false;
  simpleInputOpen = false;

  initialFormValue: any[];
  hasChanged = false;
  vcwId: number;
  projectId: number;
  isLoading = false;

  valueType: string[] = ['Number', 'Yes/No'];

  useMocks: boolean;

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private vcwPhasesService: VcwPhasesService,
              private snackbarService: SnackbarService,
              private mockService: VcwMockService) {}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.dataFormArray = this.formBuilder.array([]);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
        this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getCriterias(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {
        data.forEach(dataItem => {
          this.dataFormArray.push(this.formBuilder.group(createCriteriasConfig));
          this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(dataItem);
        });
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
        .during(5000).show();
      });
    }

    /*
      Here should be performed a request to the back-end, to check and fetch existing data.
      The code below is using mocks.
    */
    if (this.useMocks) {
      this.mockService.getCriterias().pipe(take(1)).subscribe((data) => {
        data.forEach(d => {
          this.dataFormArray.push(this.formBuilder.group(createCriteriasConfig));
          this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(d);
        });
      });
    }
  }

  onAddCriteria() {
    this.dataForm = this.formBuilder.group(createCriteriasConfig);
    this.simpleInputOpen = true;
    this.dataForm.controls.file.disable({onlySelf: true});
  }

  onDirectAdd() {
    // send request to back-end. On successful response, push to data form array.
    if (this.dataForm.valid) {
      if (this.useMocks) {
        this.dataFormArray.push(this.dataForm);
        this.simpleInputOpen = false;
      } else {
        this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.dataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.dataFormArray.push(this.dataForm);
          this.simpleInputOpen = false;
        }, error => {
          this.dataForm.controls.swotField.disable({onlySelf: true});
          this.dataForm.controls.swotField.setValue(null);
          this.snackbarService.danger('Error', 'Unable to create new Criteria. Try again later.')
          .during(5000).show();
        });
      }
    }
  }

  onOpenDialog() {
    this.itemDialogOpen = true;
  }

  onCancel() {
    this.itemDialogOpen = false;
    this.editCriteriaMode = false;
    this.simpleInputOpen = false;
  }

  onConfirm() {
    // TODO: If from file, perform a request first then add Criteria(s) if the response is successful.
    this.isLoading = true;
    if (!this.editCriteriaMode) {
      // send request to back-end. On successful response, push to data form array.
      if (this.dataForm.valid) {
        if (this.useMocks) {
          this.dataFormArray.push(this.dataForm);
          this.itemDialogOpen = false;
          this.simpleInputOpen = false;
          this.isLoading = false;
        } else {
          this.vcwPhasesService.createCriteria(this.vcwId, this.projectId, this.dataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.dataFormArray.push(this.dataForm);
            this.itemDialogOpen = false;
            this.simpleInputOpen = false;
            this.isLoading = false;
          }, error => {
            this.isLoading = false;
            this.snackbarService.danger('Error', 'Unable to create new Criteria. Try again later.')
            .during(5000).show();
          });
        }
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(5000).show();
      }
    } else {
      // send request to back-end. If successful, change the previous values in the form array.
      if (this.dataForm.valid) {
        if (this.useMocks) {
          this.editCriteriaMode = false;
          this.itemDialogOpen = false;
          this.isLoading = false;
          this.dataFormArray.at(this.editCriteriaIndex).patchValue(this.dataForm.value);
        } else {
          const id = this.dataForm.controls.id.value;
          this.vcwPhasesService.editCriteria(this.vcwId, this.projectId, id, this.dataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.editCriteriaMode = false;
            this.itemDialogOpen = false;
            this.isLoading = false;
            this.dataFormArray.at(this.editCriteriaIndex).patchValue(this.dataForm.value);
          }, error => {
            this.isLoading = false;
            this.dataForm.controls.swotField.disable({onlySelf: true});
            this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
            .during(5000).show();
          });
        }
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(5000).show();
      }
    }
  }

  editCriteria(index: number) {
    this.editCriteriaMode = true;
    this.itemDialogOpen = true;
    this.dataForm = this.formBuilder.group(createCriteriasConfig);
    this.dataForm.patchValue(this.dataFormArray.at(index).value);
    this.editCriteriaIndex = index;
  }

  deleteCriteria(index: number, CriteriaNameControl: AbstractControl, CriteriaIdControl: AbstractControl) {
    // call confirm dialog then delete Criteria
    this.actionConfirmTitle = 'Delete Criteria';
    this.actionConfirmText = `Are you sure you want to delete the Criteria "${CriteriaNameControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        if (this.useMocks) {
          this.dataFormArray.removeAt(index);
        } else {
          this.vcwPhasesService.deleteCriteria(this.vcwId, this.projectId, CriteriaIdControl.value)
          .pipe(take(1))
          .subscribe(response => {
            this.dataFormArray.removeAt(index);
          }, error => {
            this.snackbarService.danger('Error', 'Unable to delete Criteria. Try again later.')
            .during(5000).show();
          });
        }
      }
    });
  }

  getIcon(CriteriaSourceControl: AbstractControl): IconDefinition {
    if (CriteriaSourceControl?.value) {
      return faGlobe;
    } else {
      return faUser;
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
}
