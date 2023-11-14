import { Component, Output, forwardRef, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, UntypedFormGroup } from '@angular/forms';
import { PropositionUserData } from '@core';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

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

  faMinus = faMinus;
  
  labels:string[];
  users:string[];
  values:number[];

  mainForm: UntypedFormGroup;
  inputForm: UntypedFormGroup;

  isAddingLabel: boolean;
  isAddingUser: boolean;

  maxColumns: boolean = false;
  maxRows: boolean = false;

  @Output() data: EventEmitter<PropositionUserData> = new EventEmitter; 
  @Input() valuesUser:string;

  constructor(private formBuilder: FormBuilder) {
    this.mainForm = formBuilder.group({});
    this.inputForm = formBuilder.group({});
    this.addControlToForm('inputValue', this.inputForm);
  }


  ngOnInit(): void {
    setTimeout(()=>{

      const values: PropositionUserData = JSON.parse(this.valuesUser["valueProposition"]);
      this.data.emit(values);
      Object.keys(values).forEach((user)=>{
        this.addControlToForm(user, this.mainForm);
        this.buildNestedFormGroup(user, {}, 'group')
        const group = (this.mainForm.get(user) as FormGroup)
        this.labelRows.forEach(label => {
        this.addControlToForm(label, group);
        });
       
        
      })
      


     /* Object.keys(this.mainForm.controls).forEach((key) => {
        const group = (this.mainForm.get(key) as FormGroup);
        this.addControlToForm(label, group);
      })*/
      
    },300);
 
  }


  
   
  

  showData(){
  this.mainForm.updateValueAndValidity();

  if (this.mainForm.valid) {
    const values: PropositionUserData = this.mainForm.value;

    this.data.emit(values);
  }

  }

  addControlToForm(key: string, formGroup: FormGroup) {
    formGroup.addControl(key, this.formBuilder.control(null, null));
  }

  removeControlToFormUser(key: string[], formGroup: FormGroup) {
      const lastUserIdx = this.userColumns.length - 1 ;
      formGroup.removeControl(key[lastUserIdx]);
  }

  removeControlToFormLabel(key: string[], formGroup: FormGroup) {
    const lastLabelIdx = this.labelRows.length - 1 ;
    formGroup.removeControl(key[lastLabelIdx]);
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
 
    if(this.userColumns.length <= 4 ){
      this.inputForm.get('inputValue').reset();
      this.isAddingUser = true;

      if(this.userColumns.length === 4 ){
        this.maxColumns = true;
      }
    }
  }

  addLabel() {
    if(this.labelRows.length <= 4 ){
      this.inputForm.get('inputValue').reset();
      this.isAddingLabel = true;

      if(this.labelRows.length === 4 ){
        this.maxRows = true;
      }
    }
  }

  addUserColumn() {
   
      this.isAddingUser = false;
      const user = this.inputForm.get('inputValue').value;
      this.addControlToForm(user, this.mainForm);
      this.buildNestedFormGroup(user, {}, 'group')
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

  removeUser(){
    if(this.userColumns.length === 5 ){
      this.maxColumns = false;
    }
    this.removeControlToFormUser(this.userColumns, this.mainForm);
  }

  removeLabel(){
    if(this.labelRows.length === 5 ){
      this.maxRows = false;
    }
    this.removeControlToFormLabel(this.labelRows, this.mainForm.get(this.userColumns[0]) as FormGroup); 
  }

  cancelInput(){
    if(this.isAddingUser){
      this.maxColumns = false;
      this.isAddingLabel = false; 
      this.isAddingUser = false;
    }else{
      this.maxRows = false;
      this.isAddingLabel = false; 
      this.isAddingUser = false;
    }
  }
}

