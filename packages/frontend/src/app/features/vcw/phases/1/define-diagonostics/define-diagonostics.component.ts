import { Component, OnInit } from '@angular/core';
import { SwotField } from '@core';

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

  swotFields: SwotField[] = [];

  constructor() {}


  ngOnInit(): void {
    this.swotFields.push(
      {
        categoryId: 0,
        title: 'Strength 1',
        description: 'St Desc 1'
      },
      {
        categoryId: 2,
        title: 'Threat 1',
        description: 'Threat Desc 1'
      },
      {
        categoryId: 0,
        title: 'Strength 2',
        description: 'St Desc 2'
      }
    );
  }

  changeTab(index: number) {
    this.activeTab = index;
  }
}
