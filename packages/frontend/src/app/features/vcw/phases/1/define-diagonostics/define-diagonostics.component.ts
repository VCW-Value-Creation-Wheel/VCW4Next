import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, swotAnalysisConfig, SwotField, swotFieldsConfig } from '@core';
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

  constructor(private formbuilder: FormBuilder,
              private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.dataForm = this.formbuilder.group(swotAnalysisConfig);
    this.dataForm.controls.swotFields = this.formbuilder.array([]);
  }


  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
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
    console.log(this.isFormValid('swotFields'));
  }

  getValidator(control: string, nestingControl?: string, index?: number): boolean {
    let validator;
    if (nestingControl) {
      validator = (this.dataForm.get(nestingControl) as FormArray).controls[index].get(control)?.validator;
    } else {
      validator = this.dataForm.get(control)?.validator;
    }
    if (validator) {
      const val = validator({} as AbstractControl);
      if (val && val.required) {
          return true;
      }
    }
    return false;
  }

  isFormValid(control: string) {
    let isValid = true;
    (this.dataForm.get(control) as FormArray)?.controls.every((control) => {
      if (control.invalid) {
        isValid = false;
        return;
      }
    });
    return isValid;
  }
}
