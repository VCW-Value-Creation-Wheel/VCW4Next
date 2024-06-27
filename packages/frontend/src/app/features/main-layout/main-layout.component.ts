import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ContextService, PhaseNavigationService, ProjectsService, VcwService } from '@core';
import { KeycloakService } from 'keycloak-angular';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  currentRoute: string;
  componentDestroyed$ = new Subject<boolean>();

  isAuthenticated = false;
  userProfile: any;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private phaseNavigationService: PhaseNavigationService,
              private keycloak: KeycloakService,
              private contextService: ContextService,
              private projectService: ProjectsService,
              private vcwService: VcwService) { }

  ngOnInit(): void {
    this.contextService.setProjectContext(undefined);
    this.contextService.setVCWContext(undefined);
    this.route.events.pipe(takeUntil(this.componentDestroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.getCurrentProjectAndVCW();
      }
    });

    this.keycloak.isLoggedIn().then(value => {
      this.isAuthenticated = value;
      if (this.isAuthenticated) {
        this.keycloak.getKeycloakInstance().loadUserInfo().then(profile => this.userProfile = profile);
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  get isVcwPhase() {
    return this.currentRoute?.includes('/phases/');
  }

  get vcwPhaseId() {
    return this.currentRoute?.split('/phases/')[1].split('/')[0];
  }

  get vcwPhaseFullName() {
    return this.phaseNavigationService.getPhaseName(this.vcwPhaseId);
  }

  onNavigateLeft() {
    this.phaseNavigationService.navigateToPrevious(this.vcwPhaseId);
  }

  onNavigateRight() {
    this.phaseNavigationService.navigateToNext(this.vcwPhaseId);
  }

  onLogout() {
    this.keycloak.logout();
  }

  get selectedProject() {
    return this.contextService.getProjectContext()?.name ?? '';
  }

  get selectedVCW() {
    return this.contextService.getVCWContext()?.name ?? '';
  }

  getCurrentProjectAndVCW() {
    const projectPath = this.currentRoute.split('/projects/');
    const vcwPath = this.currentRoute.split('/vcw/');
    if (projectPath.length > 1) {
      const projecID = projectPath[1][0];
      this.projectService.getProjectById(parseFloat(projecID)).pipe(take(1))
      .subscribe((projectData) => {
        this.contextService.setProjectContext(projectData);
        if (vcwPath.length > 1) {
          const vcwID = vcwPath[1][0];
          this.vcwService.getVcw(parseFloat(projecID), parseFloat(vcwID)).pipe(take(1))
          .subscribe((vcwData) => {
            this.contextService.setVCWContext(vcwData);
          })
        } else {
          this.contextService.setVCWContext(undefined);
        }
      });
    } else {
      this.contextService.setProjectContext(undefined);
    }
  }

}
