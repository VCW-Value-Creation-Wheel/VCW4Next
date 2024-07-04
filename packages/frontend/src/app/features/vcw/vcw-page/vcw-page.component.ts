import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, SnackbarService, VCW, VcwService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { take } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-vcw-page',
  templateUrl: './vcw-page.component.html',
  styleUrls: ['./vcw-page.component.scss']
})
export class VcwPageComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  faTrashCan = faTrashCan;

  // vcwType: string;
  projectId: number;
  vcwId: number;

  vcw$: Observable<VCW>;
  actionConfirm$: Subject<boolean> = new Subject();

  useMocks: boolean;
  confirmDialogOpen: boolean = false;
  canDeleteVCW: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwService: VcwService,
              private vcwMockService: VcwMockService,
              private snackbar: SnackbarService,
              private projectsService: ProjectsService,
              private keycloak: KeycloakService) {}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    // mock
    if (this.useMocks) {
      this.vcw$ = this.vcwMockService.getVcwById(this.vcwId);
    } else {
      this.vcw$ = this.vcwService.getVcw(this.projectId, this.vcwId);
    }

    this.projectsService.getProjectRoles(this.projectId).pipe(take(1))
    .subscribe({
      next: (data) => {
        this.keycloak.isLoggedIn().then((authenticated) => {
          if (authenticated) {
            const userHash = this.keycloak.getKeycloakInstance().userInfo['sub'];
            const coordinatorHash = data.find(userEnum => userEnum.role.name === 'Coordinator')?.userInum;

            this.canDeleteVCW = userHash === coordinatorHash;
          }
        });
      }
    });
  }

  onClick(id: string) {
    this.router.navigate(['phases/' + id], {relativeTo: this.activatedRoute});
  }

  onBack() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }

  deleteVcw() {
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe((userConfirm) => {
      if (userConfirm) {
        this.confirmDialogOpen = false;
        this.vcwService.deleteVcw(this.projectId, this.vcwId).pipe(take(1))
        .subscribe({
          next: () => {
            this.snackbar.success('VCW Deleted!', 'The selected VCW was successfully deleted.')
            .during(4000).show();
            this.onBack();
          },
          error: () => {
            this.snackbar.danger('Error!', 'Could not delete VCW. Try again later.')
            .during(4000).show();
          }
        });
      } else {
        this.confirmDialogOpen = false;
      }
    });

  }

  onActionCancel() {
    this.actionConfirm$.next(false);
  }

  onActionConfirm() {
    this.actionConfirm$.next(true);
  }
}
