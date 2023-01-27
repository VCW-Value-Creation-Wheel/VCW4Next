import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-phase-navigation',
  templateUrl: './phase-navigation.component.html',
  styleUrls: ['./phase-navigation.component.scss']
})
export class PhaseNavigationComponent implements OnInit {

  @Input() title: string;
  @Output() leftButtonClick = new EventEmitter();
  @Output() rightButtonClick = new EventEmitter();

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor() {}

  ngOnInit(): void {

  }

  onLeftButtonClick() {
    this.leftButtonClick.emit();
  }

  onRightButtonClick() {
    this.rightButtonClick.emit();
  }

}
