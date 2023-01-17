import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { swotAnalysisConfig, SwotField, swotFieldsConfig } from '@core';
import { faPlus, faMinus, faTimes, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-define-diagonostics',
  templateUrl: './define-diagonostics.component.html',
  styleUrls: ['./define-diagonostics.component.scss']
})
export class DefineDiagonosticsComponent implements OnInit {

  dataForm: UntypedFormGroup;

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

  constructor(private formbuilder: FormBuilder) {
    this.dataForm = this.formbuilder.group(swotAnalysisConfig);
    this.dataForm.controls.swotFields = this.formbuilder.array([]);
  }


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
    (this.dataForm.controls.swotFields as FormArray).push(
      this.formbuilder.group(swotFieldsConfig)
    );

    this.swotFields.push({
      categoryId: tabId,
      title: '',
      description: ''
    });
    ((this.dataForm.controls.swotFields as FormArray).controls[this.swotFields.length - 1] as FormGroup)
      .controls.categoryId.setValue(tabId);
  }

  removeField(fieldId: number) {
    this.swotFields.splice(fieldId, 1);
    (this.dataForm.controls.swotFields as FormArray).removeAt(fieldId);
  }

  getSwotFieldsByCategory(categoryId: number): SwotField[] {
    return this.swotFields.filter(field => field.categoryId === categoryId);
  }

  onSave() {
    console.log(this.dataForm)
  }
}
