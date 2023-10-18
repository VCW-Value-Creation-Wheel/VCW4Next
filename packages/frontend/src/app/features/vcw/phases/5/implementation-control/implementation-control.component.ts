import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';

@Component({
  selector: 'app-implementation-control',
  templateUrl: './implementation-control.component.html',
  styleUrls: ['./implementation-control.component.scss']
})
export class ImplementationControlComponent implements OnInit{

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
