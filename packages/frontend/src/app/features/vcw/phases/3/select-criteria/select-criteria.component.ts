import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Criteria, PhaseNavigationService, VcwPhasesService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faFloppyDisk, faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-select-criteria',
  templateUrl: './select-criteria.component.html',
  styleUrls: ['./select-criteria.component.scss']
})
export class SelectCriteriaComponent implements OnInit {
  faFloppyDisk = faFloppyDisk;

  vcwId: number;
  projectId: number;

  criterias: Criteria[];

  useMocks: boolean;


  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private vcwPhasesService: VcwPhasesService,
      private vcwMockService: VcwMockService,
    ){}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    if (this.useMocks){
      this.vcwMockService.getCriterias().subscribe(
      data => this.criterias = data);
    } else{
      this.vcwPhasesService.getCriterias(this.vcwId, this.projectId).subscribe(
        data => this.criterias = data);
    }

  }

  onSave() {
  }


  toggleSelected(id: number): void {
    if (!this.useMocks){
      const criteriaData = JSON.parse(JSON.stringify(this.criterias.find(criteria => criteria.id === id)));
      criteriaData.isSelected = !criteriaData.isSelected;
      this.vcwPhasesService.editCriteria(this.vcwId, this.projectId, id, criteriaData)
      .subscribe(data =>{
        this.criterias.find(criteria => criteria.id === id).isSelected = !this.criterias.find(criteria => criteria.id === id).isSelected;
      });
    } else {
      this.criterias.find(criteria => criteria.id === id).isSelected = !this.criterias.find(criteria => criteria.id === id).isSelected;
    }
  }

  getIcon(value: string): IconDefinition {
    if (value) {
      return faGlobe;
    } else {
      return faUser;
    }
  }
}
