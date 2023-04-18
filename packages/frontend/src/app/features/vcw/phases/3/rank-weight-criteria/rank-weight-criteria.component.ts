import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService, SnackbarService, Criteria, createRankCriteriaConfig, CheckboxItemInput } from '@core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-rank-weight-criteria',
  templateUrl: './rank-weight-criteria.component.html',
  styleUrls: ['./rank-weight-criteria.component.scss']
})
export class RankWeightCriteriaComponent implements OnInit {

  vcwId: number;
  projectId: number;

  selectedCriteria: Criteria[];

  rankCriteriaFormArray: UntypedFormArray;
  rankCriteriaForm: UntypedFormGroup;
  rankingCriteria: Criteria;

  itemDialogOpen = false;
  isLoading = false;
  checkboxes: CheckboxItemInput[] = [
    {
      label: 'Must have',
      value: 'must_have'
    },
    {
      label: 'Nice to have',
      value: 'nice_to_have'
    }
  ];

  constructor(private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.rankCriteriaFormArray = this.formBuilder.array([]);

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwPhasesService.getSelectedCriterias(this.vcwId, this.projectId)
    .pipe((take(1), map(response => response.filter(vc => vc.selected))))
    .subscribe((vcwHasCriteriaData) => {
      const selectedIds = vcwHasCriteriaData.map((vc) =>  vc.id);
      this.vcwPhasesService.getCriterias(this.vcwId, this.projectId)
      .pipe(take(1), map((criteria) => criteria.filter((c) => selectedIds.includes(c.id))))
      .subscribe((criteria) => {
        this.selectedCriteria = criteria;
        vcwHasCriteriaData.forEach((data) => {
          const dataForm = this.formBuilder.group(createRankCriteriaConfig);
          this.rankCriteriaFormArray.push(dataForm);
          this.rankCriteriaFormArray.at(this.rankCriteriaFormArray.length - 1).patchValue(data);
        });
      });
    });
  }

  getIcon(source: any): IconDefinition {
    if (source) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  editCriteriaRank(criteria: Criteria) {
    this.rankingCriteria = criteria;
    this.rankCriteriaForm = this.formBuilder.group(createRankCriteriaConfig);
    this.rankCriteriaForm.patchValue(
      this.rankCriteriaFormArray.controls.find(ctrl => ctrl.get('id').value === criteria.id).value
    );
    this.itemDialogOpen = true;
  }

  onCancel() {
    this.itemDialogOpen = false;
    this.rankCriteriaForm = undefined;
  }

  onConfirm() {
    if (this.rankCriteriaForm.valid) {
      this.isLoading = true;
      const criteriaId = this.rankingCriteria.id;
      if (criteriaId) {
        this.vcwPhasesService.updateCriteriaRanking(this.vcwId,
          this.projectId, criteriaId, this.rankCriteriaForm.value)
        .pipe(take(1)).subscribe((response) => {
          this.rankCriteriaFormArray.controls.find(ctrl => ctrl.get('id').value === response.id).patchValue(response);
          this.itemDialogOpen = false;
          this.isLoading = false;
          this.snackbarService.success('Success!', 'Criteria ranking updated successfully.')
          .during(3000).show();
        }, (error) => {
          this.isLoading = false;
          this.snackbarService.danger('Error!', 'Could not save your changes. Please try again.')
          .during(3000).show();
        });
      } else {
        this.snackbarService.danger('Error!', 'Unable to access data of the selected criteria. Please refresh'+
        ' your page or contact support for help.').during(3000).show();
      }
    } else {
      this.snackbarService.danger('Error!', 'Form not valid. Please review your values.')
      .during(3000).show();
    }
  }

  getColor(criteria: Criteria): string {
    const criteriaRankData = this.rankCriteriaFormArray.controls.find(ctrl => ctrl.get('id').value === criteria.id);
    if (criteriaRankData) {
      const criteriaType = criteriaRankData.get('type').value;
      return criteriaType === 'must_have' ? 'bg-red-100' : (criteriaType === 'nice_to_have' ? 'bg-green-100' : 'bg-blue-100');
    } else {
      return 'bg-blue-100';
    }
  }
}
