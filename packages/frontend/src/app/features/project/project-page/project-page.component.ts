import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProjectService, Project, VcwService, VCW, ProjectsService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus, faPenToSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { KeycloakService } from 'keycloak-angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  projectId: number;

  faPlus = faPlus;
  faPenToSquare = faPenToSquare;
  faArrowLeft = faArrowLeft;

  // vcws: VCW[] = [];
  vcws$: Observable<VCW[]>;
  project$: Observable<Project>;

  useMocks: boolean;
  canEditProject: boolean;

  constructor(
    private vcwMockService: VcwMockService,
    private mockProjectService: MockProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private vcwService: VcwService,
    private projectsService: ProjectsService,
    private keycloak: KeycloakService
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


    this.projectsService.getProjectRoles(this.projectId).pipe(take(1))
    .subscribe({
      next: (data) => {
        this.keycloak.isLoggedIn().then((authenticated) => {
          if (authenticated) {
            const userHash = this.keycloak.getKeycloakInstance().userInfo['sub'];
            const coordinatorHash = data.find(userEnum => userEnum.role.name === 'Coordinator')?.userInum;

            this.canEditProject = userHash === coordinatorHash;
          }
        });
      }
    });
    
  }

  onVcwClick(vcw: VCW) {
    this.router.navigate(['vcw/' + vcw.id], { relativeTo: this.route });
  }

  addNewVcw() {
    this.router.navigate(['new-vcw'], { relativeTo: this.route });
  }

  editProject(){
    this.router.navigate(['edit-project'], { relativeTo: this.route });
  }

  onBack() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

}
