import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxItemInput, createCriteriasConfig,
  createIdeasConfig,
  createPairConfig,
  InputMap,
  PhaseNavigationService,
  SnackbarService,
  sourceConfig,
  VcwPhasesService
} from '@core';
import { faGlobe, faPlus, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-purification-page',
  templateUrl: './purification-page.component.html',
  styleUrls: ['./purification-page.component.scss']
})
export class PurificationPageComponent implements OnInit {

  faGlobe = faGlobe;
  faUser = faUser;
  faPlus = faPlus;

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
  linkedCriteriaIds: number[] = [];
  linkedIdeaIds: number[] = [];

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

  existingPairSelected = false;

  isLoading = false;

  pairInputType: InputMap = {};
  pairValueLabel: InputMap = {};

  valueType: CheckboxItemInput[] = [
    {
      value: 'number',
      label: 'Number'
    },
    {
      value: 'yes_or_no',
      label: 'Yes/No'
    }
  ];

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwPhasesService: VcwPhasesService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService) {}

  ngOnInit(): void {
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
    this.isLoading = true;
    this.vcwPhasesService.getIdeas(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {
      data.forEach(dataItem => {
        const dataForm = this.formBuilder.group(createIdeasConfig);
        dataForm.controls.source.setValue(this.formBuilder.group(sourceConfig));
        this.ideaFormArray.push(dataForm);
        this.ideaFormArray.at(this.ideaFormArray.length - 1).patchValue(dataItem);
      });
      this.isLoading = false;
    }, error => {
      this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
      .during(2000).show();
    });

    this.vcwPhasesService.getCriterias(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {
      data.forEach(dataItem => {
        const dataForm = this.formBuilder.group(createCriteriasConfig);
        dataForm.controls.source.setValue(this.formBuilder.group(sourceConfig));
        this.criteriaFormArray.push(dataForm);
        this.criteriaFormArray.at(this.criteriaFormArray.length - 1).patchValue(dataItem);
      });
      this.isLoading = false;
    }, error => {
      this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
      .during(2000).show();
    });

    this.vcwPhasesService.getIdeaCriteriaPairs(this.vcwId, this.projectId).pipe(take(1)).subscribe(data => {
      data.forEach((dataItem) => {
        const dataForm = this.formBuilder.group(createPairConfig);
        dataForm.controls.ideaId.setValue(dataItem.idea.id);
        dataForm.controls.ideaName.setValue(dataItem.idea.name);
        dataForm.controls.criteriaId.setValue(dataItem.criteria.id);
        dataForm.controls.criteriaName.setValue(dataItem.criteria.name);
        this.pairFormArray.push(dataForm);
        this.pairFormArray.at(this.pairFormArray.length - 1).patchValue(dataItem);
      });
    });
  }

  getIcon(entryTypeId: number): IconDefinition {
    if (entryTypeId === 3) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  onIdeaSelect(index: number) {
    if (this.selectedIdeaIndex === index) {
      this.selectedIdeaIndex = undefined;
      this.linkedCriteriaIds = [];
    } else {
      this.selectedIdeaIndex = index;
      this.checkForExistingPair();
      this.checkForLinkedCriteria();
    }
  }

  onCriteriaSelect(index: number) {
    if (this.selectedCriteriaIndex === index) {
      this.selectedCriteriaIndex = undefined;
      this.linkedIdeaIds = [];
    } else {
      this.selectedCriteriaIndex = index;
      this.checkForExistingPair();
      this.checkForLinkedIdeas();
    }
  }

  onAddIdea() {
    this.ideaDataForm = this.formBuilder.group(createIdeasConfig);
    this.simpleIdeaInputOpen = true;
    this.ideaDataForm.controls.file.disable({onlySelf: true});
  }

  onDirectIdeaAdd() {
    if (this.ideaDataForm.valid) {
      this.ideaDataForm.controls.entryTypeId.setValue(1);
      this.vcwPhasesService.createIdea(this.vcwId, this.projectId, this.ideaDataForm.value)
      .pipe(take(1))
      .subscribe(response => {
        this.ideaDataForm.controls.id.setValue(response.id);
        this.ideaFormArray.push(this.ideaDataForm);
        this.simpleIdeaInputOpen = false;
        this.snackbarService.success('Success!', 'New idea added.')
        .during(2000).show();
      }, error => {
        this.snackbarService.danger('Error', 'Unable to create new idea. Try again later.')
        .during(2000).show();
      });
    }
  }

  onOpenIdeaDialog() {
    this.ideaDataForm.controls.source = this.formBuilder.group(sourceConfig);
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

    if (this.editPairMode) {
      this.editPairMode = false;
      this.pairDataForm.controls.ideaId.enable({onlySelf: true});
      this.pairDataForm.controls.ideaId.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value);
      this.pairDataForm.controls.criteriaId.enable({onlySelf: true});
      this.pairDataForm.controls.criteriaId.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value);
    }
  }

  editIdea(index: number) {
    this.editIdeaMode = true;
    this.ideaItemDialogOpen = true;
    this.ideaDataForm = this.formBuilder.group(createIdeasConfig);
    this.ideaDataForm.controls.source = this.formBuilder.group(sourceConfig);
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
        this.vcwPhasesService.deleteIdea(this.vcwId, this.projectId, ideaIdControl.value)
        .pipe(take(1))
        .subscribe(response => {
          this.ideaFormArray.removeAt(index);
          this.selectedIdeaIndex = undefined;
          this.checkForExistingPair();
          this.linkedCriteriaIds = [];
          this.snackbarService.success('Success!', 'The selected idea was deleted.')
          .during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to delete idea. Try again later.')
          .during(2000).show();
        });
      }
    });
  }

  onAddCriteria() {
    this.criteriaDataForm = this.formBuilder.group(createCriteriasConfig);
    this.simpleCriteriaInputOpen = true;
    this.criteriaDataForm.controls.file.disable({onlySelf: true});
  }

  onDirectCriteriaAdd() {
    if (this.criteriaDataForm.valid) {
      this.criteriaDataForm.controls.entryTypeId.setValue(1);
      this.vcwPhasesService.createCriteria(this.vcwId, this.projectId, this.criteriaDataForm.value)
      .pipe(take(1))
      .subscribe(response => {
        this.criteriaDataForm.controls.id.setValue(response.id);
        this.criteriaFormArray.push(this.criteriaDataForm);
        this.simpleCriteriaInputOpen = false;
        this.snackbarService.success('Success!', 'New criteria added.')
        .during(2000).show();
      }, error => {
        this.snackbarService.danger('Error', 'Unable to create new criteria. Try again later.')
        .during(2000).show();
      });
    }
  }

  onOpenCriteriaDialog() {
    this.criteriaDataForm.controls.source = this.formBuilder.group(sourceConfig);
    this.criteriaItemDialogOpen = true;
  }

  editCriteria(index: number) {
    this.editCriteriaMode = true;
    this.criteriaItemDialogOpen = true;
    this.criteriaDataForm = this.formBuilder.group(createCriteriasConfig);
    this.criteriaDataForm.controls.source = this.formBuilder.group(sourceConfig);
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
        this.vcwPhasesService.deleteCriteria(this.vcwId, this.projectId, criteriaIdControl.value)
        .pipe(take(1))
        .subscribe(response => {
          this.criteriaFormArray.removeAt(index);
          this.snackbarService.success('Success!', 'The selected criteria was deleted.')
          .during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to delete criteria. Try again later.')
          .during(2000).show();
        });
      }
    });
  }

  onIdeaConfirm() {
    // TODO: If from file, perform a request first then add idea(s) if the response is successful.
    this.isLoading = true;
    if (!this.editIdeaMode) {
      // send request to back-end. On successful response, push to data form array.
      if (this.ideaDataForm.valid) {
        this.ideaDataForm.controls.entryTypeId.enable({onlySelf: true});
        this.ideaDataForm.controls.entryTypeId.setValue(this.getEntryTypeId(this.ideaDataForm.controls.source as FormGroup));
        this.checkNullSource(this.ideaDataForm);
        this.vcwPhasesService.createIdea(this.vcwId, this.projectId, this.ideaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.ideaDataForm.controls.id.setValue(response.id);
          this.ideaFormArray.push(this.ideaDataForm);
          this.ideaItemDialogOpen = false;
          this.simpleIdeaInputOpen = false;
          this.isLoading = false;
          this.snackbarService.success('Success!', 'New idea added.')
          .during(2000).show();
        }, error => {
          this.isLoading = false;
          this.snackbarService.danger('Error', 'Unable to create new idea. Try again later.')
          .during(2000).show();
        });
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(2000).show();
      }
    } else {
      // send request to back-end. If successful, change the previous values in the form array.
      if (this.ideaDataForm.valid) {
        const id = this.ideaFormArray.at(this.editIdeaIndex).get('id').value;
        this.ideaDataForm.controls.entryTypeId.enable({onlySelf: true});
        this.ideaDataForm.controls.entryTypeId.setValue(this.getEntryTypeId(this.ideaDataForm.controls.source as FormGroup));
        this.checkNullSource(this.ideaDataForm);
        this.vcwPhasesService.editIdea(this.vcwId, this.projectId, id, this.ideaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.editIdeaMode = false;
          this.ideaItemDialogOpen = false;
          this.isLoading = false;
          this.ideaFormArray.at(this.editIdeaIndex).patchValue(this.ideaDataForm.value);
          this.snackbarService.success('Success!', 'Your changes were saved.')
          .during(2000).show();
        }, error => {
          this.isLoading = false;
          this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
          .during(2000).show();
        });
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(2000).show();
      }
    }
  }

  onCriteriaConfirm() {
    // TODO: If from file, perform a request first then add criteria(s) if the response is successful.
    this.isLoading = true;
    if (!this.editCriteriaMode) {
      // send request to back-end. On successful response, push to data form array.
      if (this.criteriaDataForm.valid) {
        this.criteriaDataForm.controls.entryTypeId.enable({onlySelf: true});
        this.criteriaDataForm.controls.entryTypeId.setValue(this.getEntryTypeId(this.criteriaDataForm.controls.source as FormGroup));
        this.checkNullSource(this.criteriaDataForm);
        this.vcwPhasesService.createCriteria(this.vcwId, this.projectId, this.criteriaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.criteriaDataForm.controls.id.setValue(response.id);
          this.criteriaFormArray.push(this.criteriaDataForm);
          this.criteriaItemDialogOpen = false;
          this.simpleCriteriaInputOpen = false;
          this.isLoading = false;
          this.snackbarService.success('Success!', 'New criteria added.')
          .during(2000).show();
        }, error => {
          this.isLoading = false;
          this.snackbarService.danger('Error', 'Unable to create new criteria. Try again later.')
          .during(2000).show();
        });
      } else {
        this.isLoading = false;
        this.snackbarService.danger('Error', 'Invalid data. Please review your form.')
          .during(2000).show();
      }
    } else {
      // send request to back-end. If successful, change the previous values in the form array.
      if (this.criteriaDataForm.valid) {
        const id = this.criteriaFormArray.at(this.editCriteriaIndex).get('id').value;
        this.criteriaDataForm.controls.entryTypeId.enable({onlySelf: true});
        this.criteriaDataForm.controls.entryTypeId.setValue(this.getEntryTypeId(this.criteriaDataForm.controls.source as FormGroup));
        this.checkNullSource(this.criteriaDataForm);
        this.vcwPhasesService.editCriteria(this.vcwId, this.projectId, id, this.criteriaDataForm.value)
        .pipe(take(1))
        .subscribe(response => {
          this.editCriteriaMode = false;
          this.criteriaItemDialogOpen = false;
          this.isLoading = false;
          this.criteriaFormArray.at(this.editCriteriaIndex).patchValue(this.criteriaDataForm.value);
          this.snackbarService.success('Success!', 'Your changes were saved.')
          .during(2000).show();
        }, error => {
          this.isLoading = false;
          this.snackbarService.danger('Error', 'Unable to save the requested changes. Try again later.')
          .during(2000).show();
        });
      } else {
        this.isLoading = false;
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
      if (this.simpleIdeaInputOpen) {
        this.onDirectIdeaAdd();
      } else if (this.simpleCriteriaInputOpen) {
        this.onDirectCriteriaAdd();
      }
    }
  }

  createEditPair() {
    if (this.existingPairSelected) {
      this.editPairMode = true;
      const selectedIdeaId = this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value;
      const selectedCriteriaId = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value;

      this.pairDataForm = this.formBuilder.group(createPairConfig);

      this.pairDataForm.patchValue(this.pairFormArray.controls.find(control =>
        control.get('ideaId').value === selectedIdeaId
        && control.get('criteriaId').value === selectedCriteriaId).value);
      this.editPairIndex = this.pairFormArray.controls.indexOf(this.pairDataForm);
      this.setCriteriaValueValidators();
      this.createPairDialogOpen = true;
    } else {
      this.pairDataForm = this.formBuilder.group(createPairConfig);
      this.pairDataForm.controls.ideaId.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value);
      this.pairDataForm.controls.ideaName.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('name').value);
      this.pairDataForm.controls.criteriaId.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value);
      this.pairDataForm.controls.criteriaName.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('name').value);
      this.setCriteriaValueValidators();
      this.createPairDialogOpen = true;
    }
  }

  deletePair() {
    const selectedIdeaId = this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value;
    const selectedCriteriaId = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value;
    const pairDataForm = (this.pairFormArray.controls.find(control =>
      control.get('ideaId').value === selectedIdeaId
      && control.get('criteriaId').value === selectedCriteriaId) as FormGroup);
    this.actionConfirmTitle = 'Delete Pair';
    this.actionConfirmText = `Are you sure you want to delete the pair
      "${pairDataForm.controls.ideaName.value}" - "${pairDataForm.controls.criteriaName.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe((userConfirm) => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        const id = pairDataForm.controls.id.value;
        this.vcwPhasesService.deleteIdeaCriteriaPair(this.vcwId, this.projectId, id)
        .pipe(take(1)).subscribe(response => {
          const pairIndex = this.pairFormArray.controls.indexOf(pairDataForm);
          this.pairFormArray.removeAt(pairIndex);
          this.selectedIdeaIndex = undefined;
          this.selectedCriteriaIndex = undefined;
          this.linkedIdeaIds = [];
          this.linkedCriteriaIds = [];
          this.snackbarService.success('Success!', 'The selected pair was deleted.')
          .during(2000).show();
        }, (error) => {
          this.snackbarService.danger('Error!', 'Unable to delete selected pair.')
          .during(2000).show();
        });
      }
    });
  }

  onPairConfirm() {
    if (this.editPairMode) {
      this.pairDataForm.controls.ideaId.enable({onlySelf: true});
      this.pairDataForm.controls.ideaId.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value);
      this.pairDataForm.controls.criteriaId.enable({onlySelf: true});
      this.pairDataForm.controls.criteriaId.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value);
      const id = this.pairFormArray.at(this.editPairIndex).get('id').value;
      this.vcwPhasesService.editIdeaCriteriaPair(this.vcwId, this.projectId, id, this.pairDataForm.value)
      .pipe(take(1)).subscribe(response => {
        this.pairFormArray.at(this.editPairIndex).patchValue(this.pairDataForm.value);
        this.createPairDialogOpen = false;
        this.editPairMode = false;
        this.snackbarService.success('Success!', 'Your changes were saved.')
        .during(2000).show();
      }, (error) => {
        this.snackbarService.danger('Error!', 'Unable to edit selected pair.')
        .during(2000).show();
      });
    } else {
      this.pairDataForm.controls.ideaId.enable({onlySelf: true});
      this.pairDataForm.controls.ideaId.setValue(this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value);
      this.pairDataForm.controls.criteriaId.enable({onlySelf: true});
      this.pairDataForm.controls.criteriaId.setValue(this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value);

      this.vcwPhasesService.createIdeaCriteriaPair(this.vcwId, this.projectId, this.pairDataForm.value)
      .pipe(take(1)).subscribe(response => {
        this.pairDataForm.controls.id.setValue(response.id);
        this.pairDataForm.controls.ideaName.enable({onlySelf: true});
        this.pairDataForm.controls.criteriaName.enable({onlySelf: true});

        const ideaName = this.ideaFormArray.at(this.selectedIdeaIndex).get('name').value;
        const criteriaName = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('name').value;

        this.pairDataForm.controls.ideaName.setValue(ideaName);
        this.pairDataForm.controls.criteriaName.setValue(criteriaName);

        this.pairFormArray.push(this.pairDataForm);
        this.checkForExistingPair();
        this.checkForLinkedIdeas();
        this.checkForLinkedCriteria();
        this.snackbarService.success('Success!', 'New pair created.')
        .during(2000).show();
      });
      this.createPairDialogOpen = false;
    }
  }

  checkForExistingPair() {
    if (this.selectedIdeaIndex !== undefined && this.selectedCriteriaIndex !== undefined) {
      const selectedIdeaId = this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value;
      const selectedCriteriaId = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value;
      this.existingPairSelected = this.pairFormArray.controls.some(control =>
        control.get('ideaId').value === selectedIdeaId && control.get('criteriaId').value === selectedCriteriaId);
    } else {
      this.existingPairSelected = false;
    }
  }

  checkForLinkedCriteria() {
    const selectedIdeaId = this.ideaFormArray.at(this.selectedIdeaIndex).get('id').value;
    const pairDataForms = (this.pairFormArray.controls.filter(control => control.get('ideaId').value === selectedIdeaId)
      .map(ctrl => ctrl.value));
    this.linkedCriteriaIds = pairDataForms.map(form => form.criteriaId);
  }

  checkForLinkedIdeas() {
    const selectedCriteriaId = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('id').value;
    const pairDataForms = (this.pairFormArray.controls.filter(control => control.get('criteriaId').value === selectedCriteriaId)
      .map(ctrl => ctrl.value));
    this.linkedIdeaIds = pairDataForms.map(form => form.ideaId);
  }

  getIdeaMainColor(idControl: AbstractControl): string {
    const id = idControl.value;
    if (this.linkedIdeaIds.some(ideaId => ideaId === id)) {
      return 'bg-orange-200';
    } else {
      return 'bg-blue-100';
    }
  }

  getCriteriaMainColor(idControl: AbstractControl): string {
    const id = idControl.value;
    if (this.linkedCriteriaIds.some(criteriaId => criteriaId === id)) {
      return 'bg-orange-200';
    } else {
      return 'bg-blue-100';
    }
  }

  setCriteriaValueValidators() {
    const inputType = this.criteriaFormArray.at(this.selectedCriteriaIndex).get('valueType').value === 'number' ? 'number' : 'text';
    if (inputType === 'number') {
      this.pairDataForm.controls.value.setValidators([Validators.required, Validators.pattern(/[0-9]*/)]);
      this.pairValueLabel = {value: 'number'};
    } else {
      this.pairDataForm.controls.value.setValidators([Validators.required, Validators.pattern(/(\bYes\b)|(\bNo\b)/)]);
      this.pairValueLabel = {value: 'yes_or_no'};
    }
    this.pairInputType = {value: inputType};
  }

  checkNullSource(formGroup: UntypedFormGroup) {
    if (formGroup.controls.source.value.name === null || formGroup.controls.source.value.name === '') {
      formGroup.controls.source = this.formBuilder.control(null);
      formGroup.updateValueAndValidity();
    }
  }

  getEntryTypeId(sourceControl: FormGroup): number {
    if (sourceControl && sourceControl.controls?.name.value) {
      return 3;
    } else {
      return 1;
    }
  }
}
