import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PhaseNavigationService } from '@core';
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

  constructor(private route: Router,
              private phaseNavigationService: PhaseNavigationService) { }

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
