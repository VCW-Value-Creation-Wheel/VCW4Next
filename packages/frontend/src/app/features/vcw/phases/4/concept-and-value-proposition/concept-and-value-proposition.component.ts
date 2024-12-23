import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { conceptConfig, PhaseNavigationService, SnackbarService, VcwPhasesService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { PropositionUserData, VCWConcept, VCWValueProposition } from '@core/models';


@Component({
  selector: 'app-concept-and-value-proposition',
  templateUrl: './concept-and-value-proposition.component.html',
  styleUrls: ['./concept-and-value-proposition.component.scss'],
})
export class ConceptAndValuePropositionComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;
  dataFormValue: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  useMocks: boolean;

  vcwConcept: VCWConcept;
  vcwValueProposition: VCWValueProposition;
  hasData = false;
  tableValues: any;
  isShowingSave: boolean = false;

  valueProposition = {
    "Sally":{
      "Knowledge": 4.1,
      "Delivery": 4.7,
      "Effectiveness": 4.5,
      "Helpful": 4.8,
      "Punctual": 5
    },
    "Steve":{
      "Knowledge": 4.9,
      "Delivery": 4.4,
      "Effectiveness": 4.4,
      "Helpful": 4.1,
      "Punctual": 4.8
    },
    "Garry":{
      "Knowledge": 4.6,
      "Delivery": 4.5,
      "Effectiveness": 4.6,
      "Helpful": 4.5,
      "Punctual": 4.7
    }
  }

  labels:string[] = [];
  userValues: Map<string,number[]> = new Map(); 
  

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(conceptConfig);
   
  }

  ngOnInit(): void {

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getConcept(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwConcept = data;
          this.isEditing = true;
          this.dataForm.controls.concept.patchValue(this.vcwConcept.concept);

        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getValueProposition(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwValueProposition = data;
          this.tableValues = data;
          this.isEditing = true;
         

        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

    }
  }

  onSave() {
    if (this.isFormValid('concept')) {
      
      this.vcwConcept.concept = this.dataForm.controls.concept.value;

      if (this.isEditing) {
        this.vcwPhasesService.editConcept(this.vcwId, this.projectId, this.vcwConcept)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      } else {
        this.vcwPhasesService.createConcept(this.vcwId, this.projectId, this.vcwConcept)
        .pipe(take(1))
        .subscribe(response => {
          this.isEditing = true;
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      }
    }
    
    
  }

  saveValue(){
    this.vcwValueProposition.valueProposition = JSON.stringify(this.tableValues);
    this.vcwPhasesService.editValueProposition(this.vcwId, this.projectId, this.vcwValueProposition)
        .pipe(take(1))
        .subscribe(response => {
          this.isEditing = true;
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();

        });
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }

  getData(data: PropositionUserData){
    this.hasData = true;
    this.tableValues = data;

    Object.keys(data).forEach(name =>{

      const userValues = [];

      Object.keys(data[name]).forEach(label =>{
       userValues.push(data[name][label]);
      
      })
      this.userValues.set(name,userValues)
      this.isShowingSave = true;
    });
   

    const user = data[Object.keys(data)[0]];
    this.labels = Object.keys(user);

  }

  disableSave(chart: any){
   this.isShowingSave = chart !== false;
  }
  
}

