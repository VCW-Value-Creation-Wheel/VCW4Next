import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Options } from '@core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
    'project-thumbnail': new FormControl() 
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(e: Event): void{
    console.log(this.form.get('project-title').value+" Created ()()()()")
  }
  
  addUser(): void{
    this.isAddUserActive = true;
    console.log("added user")
  }

  onBack(): void{
    this.router.navigate([''])
  }

}
