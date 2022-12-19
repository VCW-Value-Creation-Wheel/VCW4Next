import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from '@core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  form = new FormGroup({
    'project-name': new FormControl('', Validators.required),
    'project-description': new FormControl(''),
    'project-thumbnail': new FormControl(''),
    'project-language': new FormControl() 
  })

  labelProjectName:String = "Project Name";
  labelProjectDescription:String = "Project Description";
  labelThumbnail:String = "Thumbnail";
  labelLang:String = "Language";
  placeholder: String = "";
  buttonLabel: String = "Submit";
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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void{
  }

}
