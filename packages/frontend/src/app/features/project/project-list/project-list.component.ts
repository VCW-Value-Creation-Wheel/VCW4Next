import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  faPlus = faPlus;
  cards = [0,1,2,3,4,5,6]

  constructor() { }

  ngOnInit(): void {
  }

}
