import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUser,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../../environments/environment';
import * as pkg from '../../../../../../package.json';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PhaseNavigationService } from '@core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() isAuthenticated: boolean | null = false;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private route: Router, private phaseNavigationService: PhaseNavigationService) { }

  isShowingProfileCard = false;
  faUser = faUser;
  signOutIcon = faSignOutAlt;
  close = faTimes;
  signIn = faSignInAlt;
  questionIcon = faQuestionCircle;
  env = environment;
  pkg = pkg;

  currentRoute: string;

  componentDestroyed$ = new Subject<boolean>();


  ngOnInit(): void {
    this.route.events.pipe(takeUntil(this.componentDestroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  onLogin(): void {
    this.login.emit();
  }

  onLogout(): void {
    this.isShowingProfileCard = false;

    this.logout.emit();
  }

  getInitials(name: string): string {
    const initials = name.split(' ');
    if (initials.length >= 2) {
      return (
        initials[0].charAt(0).toUpperCase() +
        initials[1].charAt(0).toUpperCase()
      );
    } else {
      return initials[0].charAt(0).toUpperCase();
    }
  }

  getUserData() {

    // implement when an auth service exists
    return undefined;
  }

  get isVcwPhase() {
    return this.currentRoute?.includes('/phases/');
  }

  get vcwPhaseId() {
    return this.currentRoute?.split('/phases/')[1];
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

}
