import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';

@Component({
  selector: 'app-ms-and-business-model',
  templateUrl: './ms-and-business-model.component.html',
  styleUrls: ['./ms-and-business-model.component.scss']
})
export class MsAndBusinessModelComponent implements OnInit{

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
