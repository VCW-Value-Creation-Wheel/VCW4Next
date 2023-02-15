import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProjectService, Project, VcwService, VCW, ProjectsService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

  useMocks: boolean;

  constructor(
    private vcwMockService: VcwMockService,
    private mockProjectService: MockProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private vcwService: VcwService,
    private projectsService: ProjectsService
    ) { }

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.projectId = parseInt(this.route.snapshot.paramMap.get('project_id'), 10);

    // this loads a mock for testing. Disable this when loading from the back-end.
    if (this.useMocks) {
      this.project$ = this.mockProjectService.getById(this.projectId);
      this.vcws$ = this.vcwMockService.getVcws(this.projectId);
    } else {
      this.project$ = this.projectsService.getProjectById(this.projectId);
      this.vcws$ = this.vcwService.getProjectVcws(this.projectId);
    }
  }

  onVcwClick(vcw: VCW) {
    this.router.navigate(['vcw/' + vcw.id], { relativeTo: this.route });
  }

  addNewVcw() {
    this.router.navigate(['new-vcw'], { relativeTo: this.route });
  }

}
