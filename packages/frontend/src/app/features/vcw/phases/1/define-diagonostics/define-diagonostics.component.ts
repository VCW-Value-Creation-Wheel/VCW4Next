import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-define-diagonostics',
  templateUrl: './define-diagonostics.component.html',
  styleUrls: ['./define-diagonostics.component.scss']
})
export class DefineDiagonosticsComponent implements OnInit {

  activeTab = 0;

  swotTabs = [
    'Strengths',
    'Weaknesses',
    'Threats',
    'Opportunities'
  ];

  constructor() {}


  ngOnInit(): void {

  }

  changeTab(index: number) {
    this.activeTab = index;
  }
}
