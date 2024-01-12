import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, PhaseNavigationService, SnackbarService, testAndKpisEvaluationConfig, threeMsConfig, VcwPhasesService } from '@core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { VCWChallenge, VCWTestAndKpisEvaluation, VCWThreeMs } from '@core/models';
import { environment } from '../../../../environments/environment';
import domtoimage from 'dom-to-image';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-final-vcw-report',
  templateUrl: './final-vcw-report.component.html',
  styleUrls: ['./final-vcw-report.component.scss']
})
export class FinalVcwReportComponent {


  faDownload = faDownload;

  dataForm: UntypedFormGroup;
  dataFormKpis: UntypedFormGroup;
  dataFormThreeMs: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  useMocks: boolean;

  vcwChallenge: VCWChallenge;
  vcwTestAndKpisEvaluation: VCWTestAndKpisEvaluation;
  vcwThreeMs: VCWThreeMs;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(challengeConfig);
    this.dataFormKpis = this.formBuilder.group(testAndKpisEvaluationConfig);
    this.dataFormThreeMs = this.formBuilder.group(threeMsConfig);
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


      this.vcwPhasesService.getTestAndKpisEvaluation(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          
          this.vcwTestAndKpisEvaluation = data;
          this.isEditing = true;
          this.dataFormKpis.controls.testAndKpisEvaluation.patchValue(this.vcwTestAndKpisEvaluation.testAndKpisEvaluation);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getThreeMs(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
       
        if (data) {

          this.vcwThreeMs = data;
          this.isEditing = true;
          this.dataFormThreeMs.controls.threeMs.patchValue(this.vcwThreeMs.threeMs);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });
    }
  }

  saveAsPDF() {
    document.getElementById('finalReport').style.display = 'visible';
    const div = document.getElementById('finalReport');
    setTimeout(() => {
      const divHeight = div.clientHeight;
      const divWidth = div.clientWidth;
      const options = { background: 'white', width: divWidth, height: divHeight };

      domtoimage.toPng(div, options).then((imgData) => {
        document.getElementById('finalReport').style.overflow = 'hidden';
        const doc = new jsPDF('p', 'mm', [divWidth, divHeight]);
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        doc.save(`FinalVCWReport.pdf`)
      });
    }, 1000);
    console.log('DOWNLOAD')
  }




}
