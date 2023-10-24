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
  SubmittedAnswers: any[] = [];
  QuestionsAndAnswers: any[] = [];
  //Sample test data it can be dynamic as well.
  QuestionsForSubmittedAnswersArray: any[] = [];
  Proposition!: FormGroup;
  labels:any;
  hasData:boolean;

  @Output() data: EventEmitter<any> = new EventEmitter;
  

  constructor(private formBuilder: FormBuilder) {
    this.createContactForm(); // init form data
    this.sampleData(); // setting up the question array data into form.
  }

  createContactForm() {
    this.Proposition = this.formBuilder.group({
      labels: this.formBuilder.array([this.initRows()]),
    });
  }

  //getter function ease up to get the form controls
  get formArr() {
    return this.Proposition.get('labels') as FormArray;
    
  }

  initRows() {
    return this.formBuilder.group({
      Knowledge: [''],
      Delivery: [''],
      Effectiveness: [''],
      Helpful: [''],
      Punctual: [''],
    });
  }

  sampleData() {
    this.QuestionsForSubmittedAnswersArray.forEach((row) => {
      this.formArr.push(this.addRow(row));
    });
  }

  addRow(obj) {
    return this.formBuilder.group({
      Knowledge: [obj.Name1],
      Delivery: [obj.Delivery],
      Effectiveness: [obj.Effectiveness],
      Helpful: [obj.Helpful],
      Punctual: [obj.Punctual],
    });
  }

  addNewRow() {
    let obj1 = {
      Knowledge: 1,
      Delivery: 1,
      Effectiveness: '',
      Helpful: 'testing',
      Punctual: 'test desc',
    };
    this.formArr.push(this.addRow(obj1));
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
    this.Proposition.get('labels').value[0].Knowledge,
    this.Proposition.get('labels').value[0].Delivery,
    this.Proposition.get('labels').value[0].Effectiveness,
    this.Proposition.get('labels').value[0].Helpful,
    this.Proposition.get('labels').value[0].Punctual,
  ];

  this.data.emit(this.labels)


  
   
  }
  

}
