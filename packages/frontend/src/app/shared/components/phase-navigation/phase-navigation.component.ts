import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-phase-navigation',
  templateUrl: './phase-navigation.component.html',
  styleUrls: ['./phase-navigation.component.scss']
})
export class PhaseNavigationComponent implements OnInit {

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor() {}

  ngOnInit(): void {

  }

}
