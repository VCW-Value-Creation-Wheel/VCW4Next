import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, MockProjectService, ProjectsService, Thumbnail } from '@core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  faPlus = faPlus;
  // projects: Project[] = [];
  projects$: Observable<Project[]>;

  projectThumbnails: Map<number, string> = new Map();

  useMocks: boolean;

  constructor(
    private projectMock: MockProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;
    // this loads a mock for testing. Disable this when loading from the back-end.

    if (this.useMocks) {
      this.projects$ = this.projectMock.projects();
    } else {
      this.projects$ = this.projectsService.getProjects();
      this.projectsService.getProjects().pipe(take(1)).subscribe((projects) => {
        projects.forEach((proj) => {
          this.setProjectThumbnail(proj.id);
        });
      });
    }
  }

  onProjectClick(projectId: number) {
    this.router.navigate(['projects/' + projectId], {relativeTo: this.route});
  }

  addNewProject() {
    this.router.navigate(['new-project'],
                        {relativeTo: this.route});
  }

  getProjectThumbnail(projectId: number): string {
    if (this.projectThumbnails.has(projectId)) {
      return this.projectThumbnails.get(projectId);
    } else {
      return undefined;
    }
  }

  setProjectThumbnail(projectId: number) {
    this.projectsService.getProjectThumbnail(projectId).pipe(take(1), map(thumbnail => thumbnail.path))
    .subscribe((path) => {
      this.projectThumbnails.set(projectId, path);
    });
  }
}
