import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Criteria, PhaseNavigationService, SnackbarService, VCWHasCriteria, VcwPhasesService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faFloppyDisk, faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-select-criteria',
  templateUrl: './select-criteria.component.html',
  styleUrls: ['./select-criteria.component.scss']
})
export class SelectCriteriaComponent implements OnInit {

  vcwId: number;
  projectId: number;

  criterias: Criteria[];

  useMocks: boolean;


  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private vcwPhasesService: VcwPhasesService,
      private snackbarService: SnackbarService,
    ){}

  ngOnInit(): void {
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
    this.vcwPhasesService.getCriterias(this.vcwId, this.projectId).pipe(take(1)).subscribe(
      data => {
        this.criterias = data;
        if (this.criterias && this.criterias.length > 0) {
          this.vcwPhasesService.getSelectedCriterias(this.vcwId, this.projectId)
          .pipe((take(1))).subscribe((vcwCriterias) => {
            this.criterias.forEach((criteria) => {
              criteria.isSelected = vcwCriterias.find(vc => vc.id === criteria.id).selected ?? false;
            })
          });
        }
      });
  }

  toggleSelected(criteria: Criteria): void {
    const criteriaSelectedData: VCWHasCriteria = {
      id: criteria.id,
      vcwId: this.vcwId,
      selected: !criteria.isSelected
    };
    this.vcwPhasesService.selectCriteria(this.vcwId, this.projectId, criteria.id, criteriaSelectedData)
    .pipe(take(1)).subscribe((response) => {
      criteria.isSelected = response.selected;
    }, (error) => {
      this.snackbarService.danger('Error!', 'Could not process your request. Please try again later.')
      .during(2000).show();
    });
  }

  getIcon(source: any): IconDefinition {
    if (source) {
      return faGlobe;
    } else {
      return faUser;
    }
  }
}
