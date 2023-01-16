import { Component, OnInit } from '@angular/core';
import { SwotField } from '@core';
import { faPlus, faMinus, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-define-diagonostics',
  templateUrl: './define-diagonostics.component.html',
  styleUrls: ['./define-diagonostics.component.scss']
})
export class DefineDiagonosticsComponent implements OnInit {

  faPlus = faPlus;
  faMinus = faMinus;
  faTimes = faTimes;
  faFloppyDisk = faFloppyDisk;

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
    // this.swotFields.push(
    //   {
    //     id: 1,
    //     categoryId: 0,
    //     title: 'Strength 1',
    //     description: 'St Desc 1'
    //   },
    //   {
    //     id: 2,
    //     categoryId: 2,
    //     title: 'Threat 1',
    //     description: 'Threat Desc 1'
    //   },
    //   {
    //     id: 3,
    //     categoryId: 0,
    //     title: 'Strength 2',
    //     description: 'St Desc 2'
    //   }
    // );
  }

  changeTab(index: number) {
    this.activeTab = index;
  }

  addField(tabId: number) {
    this.swotFields.push({
      id: this.swotFields.length + 1,
      categoryId: tabId,
      title: '',
      description: ''
    });
  }

  removeField(fieldId: number) {
    const fieldToRemove = this.swotFields.find((field) => field.id === fieldId);
    if (fieldToRemove) {
      this.swotFields.splice(this.swotFields.indexOf(fieldToRemove), 1);
    }
  }

  getSwotFieldsByCategory(categoryId: number): SwotField[] {
    return this.swotFields.filter(field => field.categoryId === categoryId);
  }

  onSave() {

  }
}
