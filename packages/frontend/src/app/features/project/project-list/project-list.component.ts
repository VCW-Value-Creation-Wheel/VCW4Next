import { Component, OnInit } from '@angular/core';
import { Project } from '@core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  faPlus = faPlus;
  cards: Project[] = [
    {title: 'Project 1', description: 'Description 1'},
    {title: 'Project 2', description: 'Description 2'},
    {title: 'Project 3', description: 'Description 3'},
    {title: 'Project 4', description: 'Description 4'},
    {title: 'Project 5', description: 'Description 5'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
