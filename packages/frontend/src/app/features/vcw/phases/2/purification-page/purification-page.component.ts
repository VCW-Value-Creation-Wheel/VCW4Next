import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, VcwPhasesService } from '@core';

@Component({
  selector: 'app-purification-page',
  templateUrl: './purification-page.component.html',
  styleUrls: ['./purification-page.component.scss']
})
export class PurificationPageComponent implements OnInit {

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwPhasesService: VcwPhasesService) {}

  ngOnInit(): void {
      
  }
}
