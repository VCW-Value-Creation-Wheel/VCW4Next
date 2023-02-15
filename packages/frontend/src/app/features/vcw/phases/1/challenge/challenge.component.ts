import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, PhaseNavigationService, SnackbarService, VcwPhasesService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(challengeConfig);
  }
  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    this.vcwPhasesService.getChallenge(this.vcwId, this.projectId)
    .pipe(take(1))
    .subscribe(data => {
      if (data) {
        this.isEditing = true;
        this.dataForm.controls.challenge.patchValue(data);
      }
    });
  }

  onSave() {
    if (this.isFormValid('challenge')) {
      if (this.isEditing) {
        this.vcwPhasesService.editChallenge(this.vcwId, this.projectId, this.dataForm.controls.challenge.value)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(5000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(5000).show();
        });
      } else {
        this.vcwPhasesService.createChallenge(this.vcwId, this.projectId, this.dataForm.controls.challenge.value)
        .pipe(take(1))
        .subscribe(response => {
          this.isEditing = true;
          this.snackbarService.success('Success!', 'Your changes were saved.').during(5000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(5000).show();
        });
      }
    }
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }

}
