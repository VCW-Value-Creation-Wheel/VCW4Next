import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from '@core';
import { faArrowLeft, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

interface UserRole {
  user: string,
  role: string
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
      label:"English",
      value:"en"
    },
    {
      label:"Português",
      value:"pt"
    },
    {
      label:"French",
      value:"fr"
    }];

    isAddUserActive: boolean = false;

    options: string[] = ['user1', 'user2', 'user3', 'user4'];
    error: boolean = false;
    isDisabled: boolean = false;
    isEditing: boolean = false;

    roleOptions: Options[] = [
      {
        label:"Admin",
        value:"Admin"
      },
      {
        label:"Normal User",
        value:"Normal User"
      }
    ]

    userRole: UserRole[]=[];

    ind :number;

  constructor(
      private router: Router, 
      private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'project-title': new FormControl('', Validators.required),
      'project-description': new FormControl(''),
      'project-language': new FormControl(),
      'project-thumbnail': new FormControl(),
      'userArray': this.formBuilder.array([])
    })
  }

  onSubmit(e: Event): void{
    console.log(this.form.get('project-title').value+" Created ()()()()")
  }
  
  addUser(): void{
    //this.form.controls.userRole.reset();
    (this.form.get('userArray') as FormArray).push(this.formBuilder.group({
      'user': new FormControl(),
      'role': new FormControl() 
    }))
    this.isAddUserActive = true;
  }

  confirmUser(): void{
    this.userRole = this.form.get('userArray').value;
    this.isAddUserActive= false;
  }

  confirmEditUser(){
    this.userRole = this.form.get('userArray').value;
    this.isEditing= false;
  }

  cancelUserSelection(): void{
    if (this.isAddUserActive){
      (this.form.get('userArray') as FormArray).controls.pop()
    }
    this.isAddUserActive = false;
    this.isEditing = false;
  }

  onBack(): void{
    this.router.navigate([''])
  }

  editUser(ind: number): void{
    this.ind = ind;
    this.isEditing = true;
    this.isAddUserActive=false;

  }

  removeUser(ind: number):void{
   (this.form.controls.userArray as FormArray).removeAt(ind);
   this.userRole = this.form.get('userArray').value;
  }

  getUserArrayIndex(isEditing:boolean): number {
    return isEditing? this.ind : (this.form.get('userArray') as FormArray).length - 1;
  }

}
