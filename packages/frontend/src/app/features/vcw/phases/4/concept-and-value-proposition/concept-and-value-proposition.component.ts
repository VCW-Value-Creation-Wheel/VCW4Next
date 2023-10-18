import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';

@Component({
  selector: 'app-concept-and-value-proposition',
  templateUrl: './concept-and-value-proposition.component.html',
  styleUrls: ['./concept-and-value-proposition.component.scss']
})
export class ConceptAndValuePropositionComponent implements OnInit{

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,   
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
    
  }

}
