import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-ideas',
  templateUrl: './create-ideas.component.html',
  styleUrls: ['./create-ideas.component.scss']
})
export class CreateIdeasComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {

  }
}
