import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  faSignInAlt,
  faSignOutAlt,
  faTimes,
  faUser,
  faQuestionCircle
} from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../../environments/environment';
import * as pkg from '../../../../../../package.json';
import { Subject } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(80%)' }),
        animate('500ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(80%)'})),
      ]),
    ])
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  // @Input() isAuthenticated: boolean | null = false;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private keycloak: KeycloakService) { }

  isAuthenticated = false;
  isShowingProfileCard = false;
  faUser = faUser;
  signOutIcon = faSignOutAlt;
  close = faTimes;
  signIn = faSignInAlt;
  questionIcon = faQuestionCircle;
  env = environment;
  pkg = pkg;

  componentDestroyed$ = new Subject<boolean>();

  private userProfile: any;


  ngOnInit(): void {
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

  onLogin(): void {
    this.login.emit();
  }

  onLogout(): void {
    this.isShowingProfileCard = false;
    this.keycloak.logout();
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
    return this.userProfile;
  }

}
