import { Component, OnInit, Output, forwardRef, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';



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
  DataArray: any[] = [];
  Proposition!: FormGroup;
  labels:string[];
  users:string[];
  values:number[];
  hasData:boolean;

  example:string[]=['eeu'];
  example2:string[]=['eeu'];
  newArray;

  @Output() data: EventEmitter<any> = new EventEmitter;
  @Output() dataUsers: EventEmitter<any> = new EventEmitter;
  @Output() dataNumbers: EventEmitter<any> = new EventEmitter;
  

  constructor(private formBuilder: FormBuilder) {
    this.createContactForm(); // init form data
    this.sampleData(); // setting up the question array data into form.
  }

  createContactForm() {
    this.Proposition = this.formBuilder.group({
      labels: this.formBuilder.array([this.initRows()]),
      values: this.formBuilder.array([this.initRows()]),
      users: this.formBuilder.array([this.initRows()]),
      
    });
  }

  //getter function ease up to get the form controls
  get formArr() {
    return this.Proposition.get('labels') as FormArray;
    
  }

  get formArrUsers() {
    return this.Proposition.get('users') as FormArray;
  }

  get formArrValues() {
    return this.Proposition.get('values') as FormArray;
  }

  initRows() {
    return this.formBuilder.group({
      Labels: [''],
  
    });
  }

  sampleData() {
    this.DataArray.forEach((row) => {
      this.formArr.push(this.addRow(row));
      this.formArrUsers.push(this.addRow(row));
      this.formArrValues.push(this.addRow(row));
    });
  }

  addRow(obj) {
    return this.formBuilder.group({
      Labels: [obj.Labels],
   
    });
  }

  addNewRow() {

    let obj1 = {
      Labels: '',
    };

    this.formArrUsers.push(this.addRow(this.formArr));
    this.formArrValues.push(this.addRow(this.formArr));
  
  
 
    
  }

  addNewColumn(){
  
    
   
    let obj1 = {
      Labels: '',

    };
    this.formArr.push(this.addRow(this.formArrUsers));
    this.formArrValues.push(this.addRow(this.formArrUsers));
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  onSubmit() {
    console.log('Your form data : ', this.Proposition.value);
  }


  ShowData(){
  this.hasData = true;
  this.labels = [
    this.Proposition.get('labels').value[0].Labels,

  ];

  this.users = [
    this.Proposition.get('values').value[0].Labels,
  ];

  this.values = [
    this.Proposition.get('values').value[0].Labels,
  
  ];
  const values =  this.Proposition.get('values').value;
  const lenght = this.formArrUsers.length;

 for(let i=0; i < lenght; i++){
  console.log(this.Proposition.get('labels').value[i].Labels)
 }


  this.data.emit(this.labels);
  this.dataUsers.emit(this.users);
  this.dataNumbers.emit(this.values);

  
   
  }
  

}

