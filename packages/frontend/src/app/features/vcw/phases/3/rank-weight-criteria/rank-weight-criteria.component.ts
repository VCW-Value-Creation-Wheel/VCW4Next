import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService, SnackbarService, Criteria } from '@core';
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

  constructor(private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwPhasesService.getSelectedCriterias(this.vcwId, this.projectId)
    .pipe((take(1), map(response => response.filter(vc => vc.selected))))
    .subscribe((selectedCriteria) => {
      const selectedIds = selectedCriteria.map((vc) =>  vc.id);
      this.vcwPhasesService.getCriterias(this.vcwId, this.projectId)
      .pipe(take(1), map((criteria) => criteria.filter((c) => selectedIds.includes(c.id))))
      .subscribe((criteria) => {
        this.selectedCriteria = criteria;
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

  editCriteriaRank(criteriaId: number) {
    
  }
}
