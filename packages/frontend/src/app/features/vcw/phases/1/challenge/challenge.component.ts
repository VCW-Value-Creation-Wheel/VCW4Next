import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, PhaseNavigationService, SnackbarService, VcwPhasesService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { VCWChallenge } from '@core/models';

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

  useMocks: boolean;

  vcwChallenge: VCWChallenge;

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

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getChallenge(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwChallenge = data;
          this.isEditing = true;
          this.dataForm.controls.challenge.patchValue(this.vcwChallenge.challenge);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });
    }
  }

  onSave() {
    if (this.isFormValid('challenge')) {

      this.vcwChallenge.challenge = this.dataForm.controls.challenge.value;

      if (this.isEditing) {
        console.log(this.dataForm);
        this.vcwPhasesService.editChallenge(this.vcwId, this.projectId, this.vcwChallenge)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(200).show();
        });
      } else {
        this.vcwPhasesService.createChallenge(this.vcwId, this.projectId, this.vcwChallenge)
        .pipe(take(1))
        .subscribe(response => {
          this.isEditing = true;
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(200).show();
        });
      }
    }
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }

}
