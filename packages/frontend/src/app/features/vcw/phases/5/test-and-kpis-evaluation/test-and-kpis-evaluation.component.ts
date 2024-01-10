import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { expectedKPIsConfig, PhaseNavigationService, SnackbarService, testAndKpisEvaluationConfig, VcwPhasesService } from '@core';
import { faFloppyDisk, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { ExpectedKPIs, VCWTestAndKpisEvaluation } from '@core/models';

@Component({
  selector: 'app-test-and-kpis-evaluation',
  templateUrl: './test-and-kpis-evaluation.component.html',
  styleUrls: ['./test-and-kpis-evaluation.component.scss']
})
export class TestAndKpisEvaluationComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;
  faLocationArrow = faLocationArrow;

  dataForm: UntypedFormGroup;
  dataFormKpis: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;
  expectedKPIs: ExpectedKPIs;

  useMocks: boolean;

  vcwTestAndKpisEvaluation: VCWTestAndKpisEvaluation;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(testAndKpisEvaluationConfig);
    this.dataFormKpis = this.formBuilder.group(expectedKPIsConfig);
  }

  ngOnInit(): void {

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getTestAndKpisEvaluation(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          
          this.vcwTestAndKpisEvaluation = data;
          this.isEditing = true;
          this.dataForm.controls.testAndKpisEvaluation.patchValue(this.vcwTestAndKpisEvaluation.testAndKpisEvaluation);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });


    
      this.vcwPhasesService.getExpectedKPIs(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          this.expectedKPIs = data;
          this.dataFormKpis.controls.kpis.patchValue(this.expectedKPIs.kpis);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });
    }
    
  }

  onSave() {
    if (this.isFormValid('testAndKpisEvaluation')) {

      this.vcwTestAndKpisEvaluation.testAndKpisEvaluation = this.dataForm.controls.testAndKpisEvaluation.value;

      if (this.isEditing) {
        this.vcwPhasesService.editTestAndKpisEvaluation(this.vcwId, this.projectId, this.vcwTestAndKpisEvaluation)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      } else {
        this.vcwPhasesService.createTestAndKpisEvaluation(this.vcwId, this.projectId, this.vcwTestAndKpisEvaluation)
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

  goPhase1C(){
    this.router.navigate(['../' + '1c'], {relativeTo: this.activatedRoute});
  }
}
