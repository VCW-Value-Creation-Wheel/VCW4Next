import { Injectable } from '@angular/core';
import { snackbars } from '@core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  public isSnackbarActive$ = new BehaviorSubject(false);

  public title = 'Success';
  public message = 'it worked!';

  private snackbar = 'success';

  public snackbarConfig = {
    deactivateAfter: 2000,
    snackbar: snackbars[this.snackbar],
  };
  constructor() {}

  private setSnackbarOptions(type: string, title: string, message: string) {
    this.setSnackbarConfig(type);
    const during = (time: number) => {
      this.setSnackbar(title, message, time);

      const show = () => {
        this.setSnackbarActive();
      };
      return { show };
    };

    return { during };
  }

  private setSnackbarConfig(snackbar: string) {
    this.snackbarConfig.snackbar = snackbars[snackbar];
  }

  private setSnackbar(title: string, message: string, time: number) {
    this.title = title;
    this.message = message;
    this.snackbarConfig.deactivateAfter = time;
  }

  private setSnackbarActive() {
    this.isSnackbarActive$.next(true);
    setTimeout(() => {
      this.isSnackbarActive$.next(false);
    }, this.snackbarConfig.deactivateAfter);
  }

  public success = (title: string, message: string) =>
    this.setSnackbarOptions('success', title, message)

  public info = (title: string, message: string) =>
    this.setSnackbarOptions('info', title, message)

  public warning = (title: string, message: string) =>
    this.setSnackbarOptions('warning', title, message)

  public danger = (title: string, message: string) =>
    this.setSnackbarOptions('danger', title, message)
}
