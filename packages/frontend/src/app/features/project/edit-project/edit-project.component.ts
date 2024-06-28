import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventOption, Options, ProjectsService, SnackbarService, UserEnum, UserInfo, UserRole } from '@core';
import { projectConfig } from '@core/configs/forms/project';
import { userConfig } from '@core/configs/forms/user';
import { Role } from '@core/models/role';
import { faArrowLeft, faPenToSquare, faSearch, faXmark, faSave, faImage, faUserPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';



@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent {

  form: FormGroup;
  formUser: FormGroup;

  faPenToSquare = faPenToSquare;
  faXmark = faXmark;
  faArrowLeft = faArrowLeft;
  faSearch = faSearch;
  faSave = faSave;
  faImage = faImage;
  faUser = faUserPlus;
  faTrashCan = faTrashCan;

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
    showInput = false;
    fileName: string;
    fileType: string;
    fileId: number;
    isAdded: boolean[] = [];
    showResults: boolean = false;


    users: UserInfo[] = [];
    projectUserEnums: UserEnum[];
    projectUserInfo: UserInfo[] = [];
    projectUserRoles: Role[];

    userRolesToRemove: UserEnum[] = [];

    roleOptions: Options[] = [];
    selectedRole: Options[] = [];

    userRole: UserRole[] = [];

    ind: number;
    inputFiles: FileList;
    projectId:number;

    actionConfirm$: Subject<boolean> = new Subject();
    confirmDialogOpen: boolean = false;

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
    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'));
    
    this.projectService.getProjectById(this.projectId).subscribe(itens =>{
      this.form = this.formBuilder.group({
        name: itens.name,
        description: itens.description,
        lang: itens.lang,
      
      });
      this.fileName = itens.fileThumbnail?.name;
      this.fileType = itens.fileThumbnail?.fileType;
      this.fileId = itens.fileThumbnail?.id;

      this.projectService.getRoles().pipe(take(1))
      .subscribe({
        next: (roles) => {
          roles.forEach((role) => {
            this.roleOptions.push({
              label: role.name,
              value: role.id
            });
          });

          this.projectService.getAllByProject(this.projectId).pipe(take(1))
          .subscribe({
            next: (users) => {
              this.projectUserEnums = users;

              const requests: {[x: number]: Observable<UserInfo[]>} = {};
              this.projectUserEnums.map((userEnum, index) => {
                requests[index] = this.projectService.getUserByUuid(userEnum.userInum);
              });

              forkJoin(requests).pipe(take(1)).subscribe({
                next: (result) => {
                  const keys = Object.keys(result)
                  keys.forEach(key => {
                    this.projectUserInfo.push(result[key][0]);
                  });

                }
              });
            },
            error: () => {}
          })
        },
        error: () => {}
      });
    });

  }

  onSubmit(e: Event): void{
    if (this.form.valid) {
      
      this.projectService.editProject(this.projectId,this.form.value)
        .pipe(take(1)).subscribe(response => {

          if (this.inputFiles !== undefined) {
            const data = new FormData();
            data.append('thumbnail', this.inputFiles[0]);
            this.projectService.editProjectThumbnail(response.id ,data,this.fileId).subscribe(res => {

              this.snackbar.success('Success!', ' Project Edited!').during(3000).show();
              this.router.navigate(['../'], {relativeTo: this.route});
            
            });

          }

          if (this.userRolesToRemove.length === 0) {
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
          } else {
            const requests: {[x: number]: Observable<Object>} = {};
            this.userRolesToRemove.map((userEnum, index) => {
              requests[index] = this.projectService.deleteProjectUser(this.projectId, userEnum.id);
            });
  
            forkJoin(requests).pipe(take(1)).subscribe({
              next: () => {
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
              }
            });
          }


          if(this.inputFiles === undefined){
            this.snackbar.success('Success!', ' Project Edited!').during(3000).show();
            this.router.navigate(['../'], {relativeTo: this.route});
          }
        
          
       }, (error) => {
        this.snackbar.danger('Error!', 'Failed on Edit Project.').during(3000).show();
        });
    } else {
      console.log(this.form)
    }
  }

  onBack(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getUserArrayIndex(isEditing: boolean): number {
    return isEditing ? this.ind : (this.form.get('userArray') as FormArray).length - 1;
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
  

  cancelRole(index: number){
    this.userRole.splice(index,1); 
  }

  removeUserRole(index: number, userEnum: UserEnum) {
    this.projectUserEnums.splice(index, 1);
    this.projectUserInfo.splice(index, 1);
    this.userRolesToRemove.push(userEnum);
  }

  isUserRoleNew(index: number, user: UserInfo) {
    const target = this.userRole.find(ur => ur.user === user.id 
      && ur.role === this.selectedRole[index].value.toString());
    return target === undefined;
  }

  deleteProject() {
    this.confirmDialogOpen = true;
    this.actionConfirm$.subscribe((userConfirm) => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        this.projectService.deleteProject(this.projectId).pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbar.success('Project deleted!', 'Your project was successfully deleted.')
            .during(4000).show();
            this.router.navigate(['../../../'], { relativeTo: this.route });
          },
          error: () => {
            this.snackbar.danger('Error!', 'Could not delete project.')
            .during(4000).show();
          }
        })
      } else {
        this.confirmDialogOpen = false;
      }
    })
  }

  onActionCancel() {
    this.actionConfirm$.next(false);
  }

  onActionConfirm() {
    this.actionConfirm$.next(true);
  }

}




