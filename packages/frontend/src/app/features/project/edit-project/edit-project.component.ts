import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventOption, Options, ProjectsService, SnackbarService, UserInfo, UserRole } from '@core';
import { projectConfig } from '@core/configs/forms/project';
import { userConfig } from '@core/configs/forms/user';
import { Role } from '@core/models/role';
import { faArrowLeft, faPenToSquare, faSearch, faXmark, faSave, faImage, faUserPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
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
    users: string[] = [];
    usersId: string[] = [];
    userWithRole: string|number|boolean[] = [];
    userInfo: UserInfo[] = [];
    allUsersRole: Role[] = [];
    userRoleId: number[] = [];

    roleOptions: Options[] = [];

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
      this.fileName = itens.fileThumbnail.name;
      this.fileType = itens.fileThumbnail.fileType;
      this.fileId = itens.fileThumbnail.id;

      this.projectService.getAllByProject(this.projectId).subscribe(allUsers =>{
        for(let i=0; i < Object.keys(allUsers).length; i++){ 
          this.userRoleId[i] = allUsers[i].id;
          this.allUsersRole[i] = allUsers[i].role.name;

          const allUsersInum = allUsers[i].userInum;
         

          this.projectService.getUserByUuid(allUsersInum).subscribe(infoUsers =>{
           
            this.userInfo[i] = infoUsers[0].username;
            
          })
          
        } 
      });
    });

  }

  onSubmit(e: Event): void{
    if (this.form.valid) {
      
      this.projectService.editProject(this.projectId,this.form.value)
        .pipe(take(1)).subscribe(response => {

          if(this.inputFiles !== undefined){
            const data = new FormData();
          data.append('thumbnail', this.inputFiles[0]);
          this.projectService.editProjectThumbnail(response.id ,data,this.fileId).subscribe(res => {

            this.snackbar.success('Success!', ' Project Edited!').during(3000).show();
            this.router.navigate(['../'], {relativeTo: this.route});
            
          });
          }this.userRole.forEach(item =>{
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
        this.isAdded[i] = false;
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
      role: this.userWithRole[index]
    });
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

  removeUserProject(index:number){
 
    this.projectService.deleteProjectUser(this.projectId,this.userRoleId[index]).subscribe(item =>{
      this.allUsersRole.splice(index,1);
      this.userInfo.splice(index,1);
    })
   
    
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
            this.router.navigate(['../../'], { relativeTo: this.route });
          },
          error: () => {
            this.snackbar.danger('Error!', 'Could not delete project.')
            .during(4000).show();
          }
        })
      } else {

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




