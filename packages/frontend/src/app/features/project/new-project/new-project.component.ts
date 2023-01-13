import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from '@core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
  form = new FormGroup({
    'project-title': new FormControl('', Validators.required),
    'project-description': new FormControl(''),
    'project-language': new FormControl(),
    'project-thumbnail': new FormControl(),
    'user': new FormControl(),
    'role': new FormControl() 
  })

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

    roleOptions: Options[] = [
      {
        label:"Admin",
        value:"admin"
      },
      {
        label:"Normal User",
        value:"user"
      }
    ]

    userRole: UserRole[]=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void{
    console.log(this.form.get('project-title').value+" Created ()()()()")
  }
  
  addUser(): void{
    this.isAddUserActive = true;
  }

  confirmUser(): void{
    this.userRole.push({
      user: this.form.value.user,
      role: this.form.value.role
    })
    
    this.isAddUserActive = false;
    console.log(this.userRole)
  }

  cancelUserSelection(): void{
    this.isAddUserActive = false;
  }

  onBack(): void{
    this.router.navigate([''])
  }

}
