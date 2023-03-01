import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createCriteriaConfig,
  createIdeasConfig,
  createPairConfig,
  PhaseNavigationService,
  SnackbarService,
  VcwPhasesService
} from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faGlobe, faPlus, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-purification-page',
  templateUrl: './purification-page.component.html',
  styleUrls: ['./purification-page.component.scss']
})
export class PurificationPageComponent implements OnInit {

  faGlobe = faGlobe;
  faUser = faUser;
  faPlus = faPlus;

  useMocks: boolean;
  vcwId: number;
  projectId: number;

  ideaFormArray: UntypedFormArray;
  criteriaFormArray: UntypedFormArray;
  ideaDataForm: UntypedFormGroup;
  criteriaDataForm: UntypedFormGroup;
  pairFormArray: UntypedFormArray;
  pairDataForm: UntypedFormGroup;

  selectedIdeaIndex: number;
  selectedCriteriaIndex: number;

  simpleIdeaInputOpen = false;
  simpleCriteriaInputOpen = false;
  ideaItemDialogOpen = false;
  criteriaItemDialogOpen = false;
  editIdeaMode = false;
  editIdeaIndex: number;
  editCriteriaMode = false;
  editCriteriaIndex: number;
  confirmDialogOpen = false;
  createPairDialogOpen = false;
  editPairMode = false;
  editPairIndex: number;

  isLoading = false;

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwPhasesService: VcwPhasesService,
              private mockService: VcwMockService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.ideaFormArray = this.formBuilder.array([]);
    this.criteriaFormArray = this.formBuilder.array([]);
    this.pairFormArray = this.formBuilder.array([]);

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
        this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);

    /*
      Here should be performed a request to the back-end, to check and fetch existing data.
      The code below is using mocks.
    */
    if (this.useMocks) {
      this.mockService.getIdeas().pipe(take(1)).subscribe((ideas) => {
        ideas.forEach(i => {
          this.ideaFormArray.push(this.formBuilder.group(createIdeasConfig));
          this.ideaFormArray.at(this.ideaFormArray.length - 1).patchValue(i);
        });
      });
      this.mockService.getCriteria().pipe(take(1)).subscribe((criteria) => {
        criteria.forEach(c => {
          this.criteriaFormArray.push(this.formBuilder.group(createCriteriaConfig));
          this.criteriaFormArray.at(this.criteriaFormArray.length - 1).patchValue(c);
        });
      });
    }
  }

  getIcon(ideaSourceControl: AbstractControl): IconDefinition {
    if (ideaSourceControl?.value) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  onIdeaSelect(index: number) {
    if (this.selectedIdeaIndex === index) {
      this.selectedIdeaIndex = undefined;
    } else {
      this.selectedIdeaIndex = index;
    }
  }

  onCriteriaSelect(index: number) {
    if (this.selectedCriteriaIndex === index) {
      this.selectedCriteriaIndex = undefined;
    } else {
      this.selectedCriteriaIndex = index;
    }
  }

  onAddIdea() {
    this.ideaDataForm = this.formBuilder.group(createIdeasConfig);
    this.simpleIdeaInputOpen = true;
    this.ideaDataForm.controls.file.disable({onlySelf: true});
  }

  onDirectIdeaAdd() {
    if (this.ideaDataForm.valid) {
      if (this.useMocks) {
        this.ideaFormArray.push(this.ideaDataForm);
        this.simpleIdeaInputOpen = false;
      } else {
        this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.ideaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.ideaFormArray.push(this.ideaDataForm);
          this.simpleIdeaInputOpen = false;
        }, error => {
          this.snackbarService.danger('Error', 'Unable to create new idea. Try again later.')
          .during(5000).show();
        });
      }
    }
  }

  onOpenIdeaDialog() {
    this.ideaItemDialogOpen = true;
  }

  onCancel() {
    this.ideaItemDialogOpen = false;
    this.editIdeaMode = false;
    this.simpleIdeaInputOpen = false;

    this.criteriaItemDialogOpen = false;
    this.editCriteriaMode = false;
    this.simpleCriteriaInputOpen = false;

    this.createPairDialogOpen = false;
  }

  editIdea(index: number) {
    this.editIdeaMode = true;
    this.ideaItemDialogOpen = true;
    this.ideaDataForm = this.formBuilder.group(createIdeasConfig);
    this.ideaDataForm.patchValue(this.ideaFormArray.at(index).value);
    this.editIdeaIndex = index;
  }

  deleteIdea(index: number, ideaNameControl: AbstractControl, ideaIdControl: AbstractControl) {
    // call confirm dialog then delete idea
    this.actionConfirmTitle = 'Delete Idea';
    this.actionConfirmText = `Are you sure you want to delete the idea "${ideaNameControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        if (this.useMocks) {
          this.ideaFormArray.removeAt(index);
        } else {
          this.vcwPhasesService.deleteIdea(this.vcwId, this.projectId, ideaIdControl.value)
          .pipe(take(1))
          .subscribe(response => {
            this.ideaFormArray.removeAt(index);
          }, error => {
            this.snackbarService.danger('Error', 'Unable to delete idea. Try again later.')
            .during(5000).show();
          });
        }
      }
    });
  }

  onAddCriteria() {
    this.criteriaDataForm = this.formBuilder.group(createCriteriaConfig);
    this.simpleCriteriaInputOpen = true;
    this.criteriaDataForm.controls.file.disable({onlySelf: true});
  }

  onDirectCriteriaAdd() {
    if (this.criteriaDataForm.valid) {
      if (this.useMocks) {
        this.criteriaFormArray.push(this.criteriaDataForm);
        this.simpleCriteriaInputOpen = false;
      } else {
        this.vcwPhasesService.createDiagnostic(this.vcwId, this.projectId, this.criteriaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.criteriaFormArray.push(this.criteriaDataForm);
          this.simpleCriteriaInputOpen = false;
        }, error => {
          this.snackbarService.danger('Error', 'Unable to create new criteria. Try again later.')
          .during(5000).show();
        });
      }
    }
  }

  onOpenCriteriaDialog() {
    this.criteriaItemDialogOpen = true;
  }

  editCriteria(index: number) {
    this.editCriteriaMode = true;
    this.criteriaItemDialogOpen = true;
    this.criteriaDataForm = this.formBuilder.group(createCriteriaConfig);
    this.criteriaDataForm.patchValue(this.criteriaFormArray.at(index).value);
    this.editCriteriaIndex = index;
  }

  deleteCriteria(index: number, criteriaNameControl: AbstractControl, criteriaIdControl: AbstractControl) {
    // call confirm dialog then delete criteria
    this.actionConfirmTitle = 'Delete Criteria';
    this.actionConfirmText = `Are you sure you want to delete the criteria "${criteriaNameControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        if (this.useMocks) {
          this.criteriaFormArray.removeAt(index);
        } else {
          // this.vcwPhasesService.deleteIdea(this.vcwId, this.projectId, criteriaIdControl.value)
          // .pipe(take(1))
          // .subscribe(response => {
          //   this.criteriaFormArray.removeAt(index);
          // }, error => {
          //   this.snackbarService.danger('Error', 'Unable to delete criteria. Try again later.')
          //   .during(5000).show();
          // });
        }
      }
    });
  }

  onIdeaConfirm() {
    // TODO: If from file, perform a request first then add idea(s) if the response is successful.
    this.isLoading = true;
    if (!this.editIdeaMode) {
      // send request to back-end. On successful response, push to data form array.
      if (this.ideaDataForm.valid) {
        if (this.useMocks) {
          this.ideaFormArray.push(this.ideaDataForm);
          this.ideaItemDialogOpen = false;
          this.simpleIdeaInputOpen = false;
          this.isLoading = false;
        } else {
          this.vcwPhasesService.createIdea(this.vcwId, this.projectId, this.ideaDataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.ideaFormArray.push(this.ideaDataForm);
            this.ideaItemDialogOpen = false;
            this.simpleIdeaInputOpen = false;
            this.isLoading = false;
          }, error => {
            this.isLoading = false;
            this.snackbarService.danger('Error', 'Unable to create new idea. Try again later.')
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
      if (this.ideaDataForm.valid) {
        if (this.useMocks) {
          this.editIdeaMode = false;
          this.ideaItemDialogOpen = false;
          this.isLoading = false;
          this.ideaFormArray.at(this.editIdeaIndex).patchValue(this.ideaDataForm.value);
        } else {
          const id = this.ideaDataForm.controls.id.value;
          this.vcwPhasesService.editIdea(this.vcwId, this.projectId, id, this.ideaDataForm.value)
          .pipe(take(1))
          .subscribe(response => {
            this.editIdeaMode = false;
            this.ideaItemDialogOpen = false;
            this.isLoading = false;
            this.ideaFormArray.at(this.editIdeaIndex).patchValue(this.ideaDataForm.value);
          }, error => {
            this.isLoading = false;
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

  onCriteriaConfirm() {
    // TODO: If from file, perform a request first then add criteria(s) if the response is successful.
    this.isLoading = true;
    if (!this.editCriteriaMode) {
      // send request to back-end. On successful response, push to data form array.
      if (this.criteriaDataForm.valid) {
        if (this.useMocks) {
          this.criteriaFormArray.push(this.criteriaDataForm);
          this.criteriaItemDialogOpen = false;
          this.simpleCriteriaInputOpen = false;
          this.isLoading = false;
        } else {
          // this.vcwPhasesService.createCriteria(this.vcwId, this.projectId, this.criteriaDataForm.value)
          // .pipe(take(1))
          // .subscribe(response => {
          //   this.criteriaFormArray.push(this.criteriaDataForm);
          //   this.criteriaItemDialogOpen = false;
          //   this.simpleCriteriaInputOpen = false;
          //   this.isLoading = false;
          // }, error => {
          //   this.isLoading = false;
          //   this.snackbarService.danger('Error', 'Unable to create new criteria. Try again later.')
          //   .during(5000).show();
          // });
        }
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(5000).show();
      }
    } else {
      // send request to back-end. If successful, change the previous values in the form array.
      if (this.criteriaDataForm.valid) {
        if (this.useMocks) {
          this.editCriteriaMode = false;
          this.criteriaItemDialogOpen = false;
          this.isLoading = false;
          this.criteriaFormArray.at(this.editCriteriaIndex).patchValue(this.criteriaDataForm.value);
        } else {
          // const id = this.criteriaDataForm.controls.id.value;
          // this.vcwPhasesService.editCriteria(this.vcwId, this.projectId, id, this.criteriaDataForm.value)
          // .pipe(take(1))
          // .subscribe(response => {
          //   this.editCriteriaMode = false;
          //   this.criteriaItemDialogOpen = false;
          //   this.isLoading = false;
          //   this.criteriaFormArray.at(this.editCriteriaIndex).patchValue(this.criteriaDataForm.value);
          // }, error => {
          //   this.isLoading = false;
          //   this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
          //   .during(5000).show();
          // });
        }
      } else {
        this.isLoading = false;
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
      if (this.simpleIdeaInputOpen) {
        this.onDirectIdeaAdd();
      } else if (this.simpleCriteriaInputOpen) {
        this.onDirectCriteriaAdd();
      }
    }
  }

  createEditPair() {
    if (this.isExistingPair) {

    } else {
      this.pairDataForm = this.formBuilder.group(createPairConfig);
      this.pairDataForm.controls.ideaId.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value);
      this.pairDataForm.controls.ideaName.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('name').value);
      this.pairDataForm.controls.criteriaId.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value);
      this.pairDataForm.controls.criteriaName.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('name').value);
      this.createPairDialogOpen = true;
    }
  }

  deletePair() {
    
  }

  onPairConfirm() {
    if (this.editPairMode) {
      this.pairDataForm.controls.ideaId.enable({onlySelf: true});
      this.pairDataForm.controls.ideaId.setValue(this.selectedIdeaIndex);
      this.pairDataForm.controls.criteriaId.enable({onlySelf: true});
      this.pairDataForm.controls.criteriaId.setValue(this.selectedCriteriaIndex);
      this.pairFormArray.at(this.editPairIndex).patchValue(this.pairDataForm);
      this.createPairDialogOpen = false;
    } else {
      this.pairDataForm.controls.ideaId.enable({onlySelf: true});
      this.pairDataForm.controls.ideaId.setValue(this.selectedIdeaIndex);
      this.pairDataForm.controls.criteriaId.enable({onlySelf: true});
      this.pairDataForm.controls.criteriaId.setValue(this.selectedCriteriaIndex);
      this.pairFormArray.push(this.pairDataForm);
      this.createPairDialogOpen = false;
    }
  }

  get isExistingPair(): boolean {
    return this.pairFormArray.controls.some(control =>
      control.get('ideaId').value === this.selectedIdeaIndex && control.get('criteriaId').value === this.selectedCriteriaIndex);
  }
}
