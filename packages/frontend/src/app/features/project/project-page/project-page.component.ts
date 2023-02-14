import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProjectService, Project, VcwService, VCW, ProjectsService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  projectId: number;

  faPlus = faPlus;
  // vcws: VCW[] = [];
  vcws$: Observable<VCW[]>;
  project$: Observable<Project>;

  constructor( 
    private vcwMockService: VcwMockService,
    private mockProjectService: MockProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private vcwService: VcwService,
    private projectsService: ProjectsService
    ) { }

  ngOnInit(): void {
    // this.mockProjectService.getById(Number(this.route.snapshot.paramMap.get('project_id'))).subscribe(project =>{
    //   this.project = project;
    //   this.vcwService.getVcws(this.project.id).subscribe((vcws => this.vcws = vcws));
    // });
    // this loads a mock for testing. Disable this when loading from the back-end.
    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'), 10);

    this.project$ = this.mockProjectService.getById(this.projectId);
    this.vcws$ = this.vcwMockService.getVcws(this.projectId);

    // this.project$ = this.projectsService.getProjectById(this.projectId);
    // this.vcws$ = this.vcwService.getProjectVcws(this.projectId);
  }

  onVcwClick(vcw: VCW) {
    this.router.navigate(['vcw/' + vcw.id], { relativeTo: this.route });
  }

  addNewVcw() {
    this.router.navigate(['new-vcw'], { relativeTo: this.route });
  }

}
