import { Injectable } from '@angular/core';
import { VCWPhase, vcwPhasesNavigation } from '@core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseNavigationService {

  private vcwPhasesNavigation: VCWPhase;

  public nextPhase$: Subject<string> = new Subject();

  constructor() {
    this.vcwPhasesNavigation = vcwPhasesNavigation;
  }

  navigateToNext(phaseId: string) {
    const nextPhaseID = this.vcwPhasesNavigation[phaseId].nextPhaseId;
    if (nextPhaseID) {
      this.nextPhase$.next(nextPhaseID);
    }
  }

  navigateToPrevious(phaseId: string) {
    const previousPhaseID = this.vcwPhasesNavigation[phaseId].previousPhaseId;
    if (previousPhaseID) {
      this.nextPhase$.next(previousPhaseID);
    }
  }

  getPhaseName(phaseId: string): string {
    return [this.vcwPhasesNavigation[phaseId].id, this.vcwPhasesNavigation[phaseId].name].join(' - ');
  }

}
