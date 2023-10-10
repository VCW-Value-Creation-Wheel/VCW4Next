import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options, ProjectsService, SnackbarService } from '@core';
import { projectConfig } from '@core/configs/forms/project';
import { faArrowLeft, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

interface UserRole {
  user: string;
  role: string;
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  form: FormGroup;

  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  faArrowLeft = faArrowLeft;

  langOptions: Options[] = [
    {
      label: 'English',
      value: 'en'
    },
    {
      label: 'Português',
      value: 'pt'
    },
    {
      label: 'French',
      value: 'fr'
    }];

    isAddUserActive = false;

    options: string[] = ['user1', 'user2', 'user3', 'user4'];
    error = false;
    isDisabled = false;
    isEditing = false;

    roleOptions: Options[] = [
      {
        label: 'Admin',
        value: 'Admin'
      },
      {
        label: 'Normal User',
        value: 'Normal User'
      }
    ];

    userRole: UserRole[] = [];

    ind: number;
    inputFiles: FileList;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private projectService: ProjectsService,
      private snackbar: SnackbarService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(projectConfig);
  }

  onSubmit(e: Event): void{
    if (this.form.valid) {
      this.projectService.createProject(this.form.value)
      .pipe(take(1)).subscribe(response => {
        
        if(this.inputFiles !== undefined){
          const data = new FormData();
          data.append('thumbnail', this.inputFiles[0]);
          this.projectService.createProjectThumbnail(response.id ,data).subscribe(res => {

            this.snackbar.success('Success!', 'New Project created!').during(3000).show();
            this.router.navigate(['../'], {relativeTo: this.route});
            
          });
        }
     
      }, (error) => {
        this.snackbar.danger('Error!', 'Project creation failed.').during(3000).show();
      });
    } else {
      console.log(this.form)
    }
  }

  addUser(): void{
    (this.form.get('userArray') as FormArray).push(this.formBuilder.group({
      user: new FormControl(),
      role: new FormControl()
    }));
    this.isAddUserActive = true;
  }

  confirmUser(): void{
    this.userRole = this.form.get('userArray').value;
    this.isAddUserActive = false;
  }

  confirmEditUser(){
    this.userRole = this.form.get('userArray').value;
    this.isEditing = false;
  }

  cancelUserSelection(): void{
    if (this.isAddUserActive){
      (this.form.get('userArray') as FormArray).controls.pop();
    }
    this.isAddUserActive = false;
    this.isEditing = false;
    (this.form.get('userArray') as FormArray).setValue(this.userRole);
  }

  onBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  editUser(ind: number): void{
    this.ind = ind;
    this.isEditing = true;
    this.isAddUserActive = false;

  }

  removeUser(ind: number): void{
   (this.form.controls.userArray as FormArray).removeAt(ind);
   this.userRole = this.form.get('userArray').value;
  }

  getUserArrayIndex(isEditing: boolean): number {
    return isEditing ? this.ind : (this.form.get('userArray') as FormArray).length - 1;
  }

  onFileSelected(event:Event){
    
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList

    this.inputFiles = files;
   
   
  }

}
