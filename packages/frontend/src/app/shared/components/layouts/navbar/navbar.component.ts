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
import { ContextService, ProjectsService, VcwService } from '@core';
import { NavigationEnd, Router } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';

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

  @Input() isAuthenticated: boolean | null = false;
  @Input() userProfile: any;
  @Output() login = new EventEmitter();
  @Output() logout = new EventEmitter();

  currentRoute: string;

  constructor( private contextService: ContextService,
    private projectService: ProjectsService,
    private vcwService: VcwService,private route: Router) { }

  isShowingProfileCard = false;
  faUser = faUser;
  signOutIcon = faSignOutAlt;
  close = faTimes;
  signIn = faSignInAlt;
  questionIcon = faQuestionCircle;
  env = environment;
  pkg = pkg;

  componentDestroyed$ = new Subject<boolean>();

  ngOnInit(): void {
    this.route.events.pipe(takeUntil(this.componentDestroyed$)).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.getCurrentProjectAndVCW();
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
    return this.userProfile;
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
      const projecID = projectPath[1].split('/')[0];
      this.projectService.getProjectById(parseFloat(projecID)).pipe(take(1))
      .subscribe((projectData) => {
        this.contextService.setProjectContext(projectData);
        if (vcwPath.length > 1) {
          const vcwID = vcwPath[1].split('/')[0];
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
