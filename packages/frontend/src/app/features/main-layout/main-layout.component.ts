import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';
import { KeycloakService } from 'keycloak-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
              private keycloak: KeycloakService) { }

  ngOnInit(): void {
    this.route.events.pipe(takeUntil(this.componentDestroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
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

}
