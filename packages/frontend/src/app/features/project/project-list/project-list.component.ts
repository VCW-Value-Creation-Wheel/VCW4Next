import { Component, OnInit } from '@angular/core';
import { Project, MockProjectService } from '@core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  faPlus = faPlus;
  projects: Project[] = [];

  constructor(private projectMock: MockProjectService) { }

  ngOnInit(): void {
    // this loads a mock for testing. Disable this when loading from the back-end.
    this.projectMock.projects().subscribe((projects => this.projects = projects));
  }

  onProjectClick(project: Project) {
    console.log(project);
  }
}
