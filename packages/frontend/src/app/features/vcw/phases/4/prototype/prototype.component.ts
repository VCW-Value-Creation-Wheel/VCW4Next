import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, prototypeConfig, SnackbarService, VcwPhasesService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { VCWPrototype } from '@core/models';

@Component({
  selector: 'app-prototype',
  templateUrl: './prototype.component.html',
  styleUrls: ['./prototype.component.scss']
})
export class PrototypeComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  useMocks: boolean;

  vcwPrototype: VCWPrototype;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(prototypeConfig);
  }

  ngOnInit(): void {

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getPrototype(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwPrototype = data;
          this.isEditing = true;
          this.dataForm.controls.prototype.patchValue(this.vcwPrototype.prototype);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });
    }
  }

  onSave() {
    if (this.isFormValid('prototype')) {

      this.vcwPrototype.prototype = this.dataForm.controls.prototype.value;

      if (this.isEditing) {
        this.vcwPhasesService.editPrototype(this.vcwId, this.projectId, this.vcwPrototype)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      } else {
        this.vcwPhasesService.createPrototype(this.vcwId, this.projectId, this.vcwPrototype)
        .pipe(take(1))
        .subscribe(response => {
          this.isEditing = true;
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      }
    }
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }
}
