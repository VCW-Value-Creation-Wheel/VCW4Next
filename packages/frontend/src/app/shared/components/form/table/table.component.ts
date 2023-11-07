import { Component, Output, forwardRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, UntypedFormGroup } from '@angular/forms';
import { PropositionUserData } from '@core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableComponent),
      multi: true,
    },
  ],
})




export class TableComponent{
  //Sample test data it can be dynamic as well.
  // DataArray: any[] = [];
  // Proposition!: FormGroup;
  
  labels:string[];
  users:string[];
  values:number[];

  mainForm: UntypedFormGroup;
  inputForm: UntypedFormGroup;

  isAddingLabel: boolean;
  isAddingUser: boolean;

  @Output() data: EventEmitter<PropositionUserData> = new EventEmitter; 

  constructor(private formBuilder: FormBuilder) {
    this.mainForm = formBuilder.group({});
    this.inputForm = formBuilder.group({});
    this.addControlToForm('inputValue', this.inputForm);
    // this.createContactForm(); // init form data
    // this.sampleData(); // setting up the question array data into form.
  }

  // createContactForm() {
  //   this.Proposition = this.formBuilder.group({
  //     labels: this.formBuilder.array([this.initRows()]),
  //     values: this.formBuilder.array([this.initRows()]),
  //     users: this.formBuilder.array([this.initRows()]),
      
  //   });
  // }

  //getter function ease up to get the form controls
  // get formArr() {
  //   return this.Proposition.get('labels') as FormArray;
    
  // }

  // get formArrUsers() {
  //   return this.Proposition.get('users') as FormArray;
  // }

  // get formArrValues() {
  //   return this.Proposition.get('values') as FormArray;
  // }

  // initRows() {
  //   return this.formBuilder.group({
  //     Labels: [''],
  
  //   });
  // }

  // sampleData() {
  //   this.DataArray.forEach((row) => {
  //     this.formArr.push(this.addRow(row));
  //     this.formArrUsers.push(this.addRow(row));
  //     this.formArrValues.push(this.addRow(row));
  //   });
  // }

  // addRow(obj) {
  //   return this.formBuilder.group({
  //     Labels: [obj.Labels],
   
  //   });
  // }

  // addNewRow() {

  //   let obj1 = {
  //     Labels: '',
  //   };

  //   this.formArrUsers.push(this.addRow(this.formArr));
  //   this.formArrValues.push(this.addRow(this.formArr));
  
  
 
    
  // }

  // addNewColumn(){
  
    
   
  //   let obj1 = {
  //     Labels: '',

  //   };
  //   this.formArr.push(this.addRow(this.formArrUsers));
  //   this.formArrValues.push(this.addRow(this.formArrUsers));
  // }

  // deleteRow(index: number) {
  //   this.formArr.removeAt(index);
  // }

  // onSubmit() {
  //   console.log('Your form data : ', this.Proposition.value);
  // }


  showData(){
  this.mainForm.updateValueAndValidity();
  if (this.mainForm.valid) {
    const values: PropositionUserData = this.mainForm.value;

    this.data.emit(values);
  }
  // this.labels = [
  //   this.Proposition.get('labels').value[0].Labels,

  // ];

  // this.users = [
  //   this.Proposition.get('values').value[0].Labels,
  // ];

  // this.values = [
  //   this.Proposition.get('values').value[0].Labels,
  
  // ];
  // const values =  this.Proposition.get('values').value;
  // const lenght = this.formArrUsers.length;

//  for(let i=0; i < lenght; i++){
//   console.log(this.Proposition.get('labels').value[i].Labels)
//  }

  
   
  }

  addControlToForm(key: string, formGroup: FormGroup) {
    formGroup.addControl(key, this.formBuilder.control(null, null));
  }

  buildNestedFormGroup(hostControlName: string, nestedControlConfig: any, type: string) {
    if (this.mainForm.controls[hostControlName]) {
        if (type === 'group') {
            this.mainForm.controls[hostControlName] = this.formBuilder.group(nestedControlConfig);
        } else if (type === 'array') {
            this.mainForm.controls[hostControlName] = this.formBuilder.array([
                this.formBuilder.group(nestedControlConfig)
            ]);
        }
    }
  }

  addUser() {
    this.inputForm.get('inputValue').reset();
    this.isAddingUser = true;
  }

  addLabel() {
    this.inputForm.get('inputValue').reset();
    this.isAddingLabel = true;
  }

  addUserColumn() {
    this.isAddingUser = false;
    const user = this.inputForm.get('inputValue').value;
    this.addControlToForm(user, this.mainForm);
    this.buildNestedFormGroup(user, {}, 'group')
    //console.log(this.mainForm)
    const group = (this.mainForm.get(user) as FormGroup)
    this.labelRows.forEach(label => {
      this.addControlToForm(label, group);
    });
  }

  addLabelRow() {
    this.isAddingLabel = false;
    const label = this.inputForm.get('inputValue').value;
    Object.keys(this.mainForm.controls).forEach((key) => {
      const group = (this.mainForm.get(key) as FormGroup);
      this.addControlToForm(label, group);
    })
    //console.log(this.mainForm)
  }

  get userColumns(): string[] {
    return Object.keys(this.mainForm.controls)
  }
  
  get labelRows(): string[] {
    if (this.userColumns.length > 0) {
      return Object.keys((this.mainForm.get(this.userColumns[0]) as FormGroup).controls);
    } else {
      return []
    }
  }
}

