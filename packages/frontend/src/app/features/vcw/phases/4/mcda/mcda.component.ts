import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, VCWMcda, VcwPhasesService, mcdaIdeas } from '@core';

@Component({
  selector: 'app-mcda',
  templateUrl: './mcda.component.html',
  styleUrls: ['./mcda.component.scss']
})
export class McdaComponent implements OnInit{

  projectId: number;
  vcwId: number;
  vcwMcda: VCWMcda;
  mcdaIdeas: mcdaIdeas[] = [];
  pass: boolean[] = [];

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

    this.vcwPhasesService.getMultipleCriteriaDecisionAnalysis(this.vcwId,this.projectId).subscribe((data)=>{
      if(data){
        console.log(data)
        this.vcwMcda = data;
        this.vcwMcda.mcdaIdeas.forEach((element)=>{
          this.mcdaIdeas.push(element);
        });
      };
    })
  }

  setPass(ideaPass: boolean, i:number){
    this.pass[i] = ideaPass;
  
    if(this.pass[i] === true){
      return 'bg-green-200';
    }else{
      
      return 'bg-red-200';
    }
  }

  getPass(i:number){
    return this.pass[i];
  }

}


