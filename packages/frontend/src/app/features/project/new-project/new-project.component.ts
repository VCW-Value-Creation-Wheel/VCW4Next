import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
  @Input() FormGroup!: FormGroup;

  labelProjectName:String = "Project Name";
  labelProjectDescription:String = "Project Description";
  labelThumbnail:String = "Thumbnail";
  labelLang:String = "Language";
  placeholder: String = ""

  constructor() { }

  ngOnInit(): void {
  }

}
