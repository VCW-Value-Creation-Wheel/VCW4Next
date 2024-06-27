import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventOption, Options, ProjectsService, SnackbarService, UserRole } from '@core';
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
    users: string[] = [];
    usersId: string[] = [];
    userWithRole: string|number|boolean[] = [];
    isAdded: boolean[] = [];
    roleOptions: Options[] = [];
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
    let user = this.formUser.get('user').value;
    if(user === ''){
      user = null
    }
    this.users = [];
    this.projectService.getUser(user).subscribe(res =>{

      const lenght = Object.keys(res).length;

      if(lenght === 0){
        this.showResults = false;
      }else{
        this.showResults = true;
      }

      for(let i=0; i< lenght; i++){
        this.isAdded[i] = this.isAdded[i] ?? false;
        this.users[i] = res[i].username;
        this.usersId[i] = res[i].id;
      }
    });

    if(this.roleOptions.length === 0){
      this.projectService.getRoles().subscribe(role =>{

        const lenght = Object.keys(role).length;
  
        for(let i=0; i< lenght; i++){
           this.roleOptions.push({
            label: role[i].name,
            value: role[i].id
           });
        }
  
      }
      );
    }
  }

  addRole(index: number){

    this.isAdded[index] = true;
    this.userRole.push({
      user: this.usersId[index],
      role: this.userWithRole[index],
      userName: this.users[index],
      roleName: this.roleOptions[index].label as string
    });

    console.log(this.userRole)
    console.log(this.users)
    console.log(this.usersId)
    console.log(this.isAdded)
    console.log(this.userWithRole)
  }

  

  cancelRole(index: number){
    this.isAdded[index] = false;
    this.userRole.splice(index,1); 
  }

  saveRole(e: EventOption, index:number){
    this.isAdded[index] = false;
    this.userRole.splice(index,1);
    this.userWithRole[index] = e.value;
  }

}

