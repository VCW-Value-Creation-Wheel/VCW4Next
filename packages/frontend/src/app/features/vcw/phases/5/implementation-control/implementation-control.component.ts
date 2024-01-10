import { Component, ElementRef, EventEmitter, HostBinding, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { implementationAndControlConfig, PhaseNavigationService, SnackbarService, VcwPhasesService } from '@core';
import { faFileUpload, faFloppyDisk, faMinus } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { Thumbnail, VCWAttachment, VCWImplementationAndControl } from '@core/models';

@Component({
  selector: 'app-implementation-control',
  templateUrl: './implementation-control.component.html',
  styleUrls: ['./implementation-control.component.scss']
})
export class ImplementationControlComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;
  faFileUpload = faFileUpload;
  faMinus = faMinus;

  dataForm: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  useMocks: boolean;
  current_file: Thumbnail;
  valid_files : Array<File>;

  vcwImplementation: VCWImplementationAndControl;
  vcwAttachment: VCWAttachment;
  

  @Output() private filesChangeEmiter : EventEmitter<File[]> = new EventEmitter();
  files: any[] = [];
  @ViewChild('FileInput') FileInput!: ElementRef;



  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(implementationAndControlConfig);
  }

  ngOnInit(): void {

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getImplementationAndControl(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          
          this.vcwImplementation = data;
          this.isEditing = true;
          this.dataForm.controls.executiveSummary.patchValue(this.vcwImplementation.executiveSummary);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getAttachment(this.vcwId, this.projectId)
        .pipe(take(1))
        .subscribe( data =>{
          if(data){
            this.current_file = data;
            this.isEditing = true;
          }
        });
    }
    
  }

  onSave() {
    if (this.isFormValid('executiveSummary')) {
    
      this.vcwImplementation.executiveSummary = this.dataForm.controls.executiveSummary.value;

      if (this.isEditing) {
       
        this.vcwPhasesService.editImplementationAndControl(this.vcwId, this.projectId, this.vcwImplementation)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });

       
        for(let i =0; i < this.valid_files.length; i++){
          const data = new FormData();
          data.append('attachment', this.valid_files[i]);
          this.vcwPhasesService.createAttachment(this.vcwId, this.projectId, data)
            .pipe(take(1))
            .subscribe((data) =>{
              this.ngOnInit();
            });
        }
        
        
      } else {
       
        this.vcwPhasesService.createImplementationAndControl(this.vcwId, this.projectId, this.vcwImplementation)
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

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }

  dropHandler(ev: any) {
   
    ev.preventDefault();
    let files = ev.dataTransfer.files;
    this.valid_files  = files;
    this.filesChangeEmiter.emit(this.valid_files);
  
  }

  onDragOver(e: DragEvent){
    e.preventDefault();
  }


  onDragLeave(e: DragEvent){
    e.preventDefault();
  }


  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[key]); 
    this.valid_files = this.files
  }

  onClick(){
    const nativeElement = this.FileInput.nativeElement;
    
    nativeElement.click();

    nativeElement.onchange = (e: Event) => {
   
      const target = e.target as HTMLInputElement;
     
    };
  }

  removeFile(idx:number){

    this.vcwPhasesService.deleteAttachment(this.vcwId,this.projectId, this.current_file[idx].id)
      .pipe(take(1))
      .subscribe((data)=>{
        this.ngOnInit();
        this.snackbarService.success('Success!', 'File removed.').during(2000).show();
      }, error => {
        this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
        .during(2000).show();
      });
  }

  

  

 
}

