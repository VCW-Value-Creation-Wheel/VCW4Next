import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Options, ProjectsService, SnackbarService } from '@core';
import { projectConfig } from '@core/configs/forms/project';
import { userConfig } from '@core/configs/forms/user';
import { faArrowLeft, faPenToSquare, faXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  formUser: FormGroup;

  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;

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

    options: string[] = [];
    users: string[] = [];
    error = false;
    isDisabled = false;
    isEditing = false;
    showResults: boolean = false;
    isAdded = false;

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
    this.formUser = this.formBuilder.group(userConfig);
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
   
    this.isAddUserActive = true;

    /*(this.form.get('userArray') as FormArray).push(this.formBuilder.group({
      user: new FormControl(),
      role: new FormControl()
    }));*/
  }

  /*
  confirmUser(): void{
    this.userRole = this.form.get('userArray').value;
    console.log(this.userRole)
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
  }*/

  onBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /*
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
  }*/

  onFileSelected(event:Event){
    
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList

    this.inputFiles = files;
    
  }

  findUser(){
    let user = this.formUser.get('user').value;
    if(user === ''){
      user = null
    }
    console.log(user)
    this.users = [];
    let username: string [] = [];
    const searchedUser = this.projectService.getUser(user).subscribe((res) =>{
      const lenght = Object.keys(res).length;

      if(lenght === 0){
        this.showResults = false;
      }else{
        this.showResults = true;
      }

      for(let i=0; i< lenght; i++){
         this.users[i] = res[i].username;
      }
    });
  }

}
