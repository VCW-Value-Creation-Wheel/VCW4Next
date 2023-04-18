import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService, SnackbarService } from '@core';

@Component({
  selector: 'app-rank-weight-criteria',
  templateUrl: './rank-weight-criteria.component.html',
  styleUrls: ['./rank-weight-criteria.component.scss']
})
export class RankWeightCriteriaComponent implements OnInit {

  vcwId: number;
  projectId: number;

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
  }
}
