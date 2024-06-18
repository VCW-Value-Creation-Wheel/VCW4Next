import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService } from '@core';

@Component({
  selector: 'app-value-creation-funnel',
  templateUrl: './value-creation-funnel.component.html',
  styleUrls: ['./value-creation-funnel.component.scss']
})
export class ValueCreationFunnelComponent implements OnInit{

  projectId: number;
  vcwId: number;

  constructor(  
    private phaseNavService: PhaseNavigationService,
    private router: Router,   
    private activatedRoute: ActivatedRoute,
    private vcwPhasesService: VcwPhasesService,
  ){}

  ngOnInit(): void {
   
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    this.vcwPhasesService.getValueCreationFunnel(this.vcwId, this.projectId).subscribe((data)=>{
      
    })
   
  }

}
