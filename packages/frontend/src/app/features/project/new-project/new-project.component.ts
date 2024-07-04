import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Option, Options, ProjectsService, SnackbarService, UserInfo, UserRole } from '@core';
import { projectConfig } from '@core/configs/forms/project';
import { userConfig } from '@core/configs/forms/user';
import { faArrowLeft, faPenToSquare, faXmark, faSearch, faSave, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';




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
  faSave = faSave;
  faUserPlus = faUserPlus;

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
    error = false;
    showResults: boolean = false;

    options: string[] = [];

    users: UserInfo[] = [];
    
    roleOptions: Option[] = [];

    selectedRole: Option[] = [];
    userRole: UserRole[] = [];

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

    this.projectService.getRoles().pipe(take(1))
    .subscribe({
      next: (roles) => {
        roles.forEach((role) => {
          this.roleOptions.push({
            label: role.name,
            value: role.id
          });
        });
      },
      error: () => {}
    });
  }

  onSubmit(e: Event): void{

   if (this.form.valid) {
      this.projectService.createProject(this.form.value)
      .pipe(take(1)).subscribe(response => {
        
        if(this.inputFiles !== undefined){
          const data = new FormData();
          data.append('thumbnail', this.inputFiles[0]);
          this.projectService.createProjectThumbnail(response.id ,data).pipe(take(1)).subscribe( {
          
            next: (res) => {
              this.router.navigate(['../'], {relativeTo: this.route});
              this.snackbar.success('Success!', 'New Project created!').during(3000).show();
            },
            error: (error) => {
              this.snackbar.danger('Error!', 'Thumbnail creation failed.').during(3000).show();
            }
        
          });
        }
        this.userRole.forEach(item =>{
          this.projectService.addUserRoleToProject(item.user,item.role,response.id).pipe(take(1)).subscribe({
            next: (res) => {
              this.snackbar.success('Success!', 'User added!').during(3000).show();
            },
            error: (error) => {
              this.snackbar.danger('Error!', 'User adition failed.').during(3000).show();
            }
          });
           
        });
        if(this.inputFiles === undefined){
          this.snackbar.success('Success!', 'New Project created!').during(3000).show();
          this.router.navigate(['../'], {relativeTo: this.route});
        }
       
      }, (error) => {
        this.snackbar.danger('Error!', 'Project creation failed.').during(3000).show();
      });
    } else {
      console.log(this.form)
    }

    
  }


  onBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onFileSelected(event:Event){
    
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList

    this.inputFiles = files;
    
  }

  findUser(){
    this.selectedRole = [];
    let user = this.formUser.get('user').value;
    if(user === ''){
      user = null
    }
    // this.users = [];
    this.projectService.getUser(user).pipe(take(1))
    .subscribe({
      next: (result) => {
        this.users = result;
      },
      error: () => {}
    });
  }

  addRole(index: number, user: UserInfo) {
    this.userRole.push({
      role: this.selectedRole[index].value.toString(),
      user: user.id,
      userName: user.username,
      roleName: this.selectedRole[index].label.toString()
    });
  }

  saveRole(event: any, index: number) {
    this.selectedRole[index] = {
      label: this.getRoleLabel(event.value),
      value: event.value
    }
  }

  getRoleLabel(roleID: string) {
    const id = parseInt(roleID);
    return this.roleOptions[id-1].label;
  }

  cancelRole(index: number) {
    this.userRole.splice(index,1); 
  }

  isUserRoleNew(index: number, user: UserInfo) {
    const target = this.userRole.find(ur => ur.user === user.id 
      && ur.role === this.selectedRole[index].value.toString());
    return target === undefined;
  }

}

