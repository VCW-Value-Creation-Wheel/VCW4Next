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
  pass: boolean[][] = [];

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
        
        this.vcwMcda = data;
        this.vcwMcda.mcdaIdeas.forEach((element)=>{
          this.mcdaIdeas.push(element);
        });
        this.evaluateIdeaAndCriteria();
      };
    })
  }



  getCriteriaPass(i: number, j: number){
    return this.pass[i][j] ? 'bg-green-200' : 'bg-red-200';
  }

  getIdeaPass(ideaIndex: number) {
    return this.pass[ideaIndex].every(value => value === true);
  }

  getValueLabel(value: number): string {
    return value > 0 ? 'Yes' : 'No';
  }
  
  evaluateIdeaAndCriteria() {
    let criteriaPass: boolean[];
    this.mcdaIdeas.forEach((ideas, ideaIndex) => {
      criteriaPass = [];
      ideas.vcfCriterias.forEach((criteria, criteriaIndex) => {
       
        criteriaPass[criteriaIndex] = criteria.ideaAndCriteria.mcdaResult > 0;
       
      });
      this.pass[ideaIndex] = criteriaPass;
    });

}
}


