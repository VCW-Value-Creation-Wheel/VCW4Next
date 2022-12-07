import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarService } from '@core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  public isSnackbarActive = false;

  constructor(public snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.snackbarService.isSnackbarActive$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((data: boolean) => (this.isSnackbarActive = data));
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
