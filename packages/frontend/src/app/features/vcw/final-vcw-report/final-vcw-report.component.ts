import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, conceptConfig, implementationAndControlConfig, PhaseNavigationService, prototypeConfig, SnackbarService, testAndKpisEvaluationConfig, threeMsConfig, VcwPhasesService } from '@core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { Thumbnail, VCWChallenge, VCWConcept, VCWImplementationAndControl, VCWPrototype, VCWTestAndKpisEvaluation, VCWThreeMs } from '@core/models';
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
  dataFormConcept: UntypedFormGroup;
  dataFormPrototype: UntypedFormGroup;
  dataFormThreeMs: UntypedFormGroup;
  dataFormExecutiveSummary: UntypedFormGroup;


  projectId: number;
  vcwId: number;
  isEditing = false;
  visibilty: boolean[] = [];

  useMocks: boolean;

  vcwChallenge: VCWChallenge;
  vcwTestAndKpisEvaluation: VCWTestAndKpisEvaluation;
  vcwConcept: VCWConcept;
  vcwPrototype: VCWPrototype;
  vcwThreeMs: VCWThreeMs;
  vcwImplementation: VCWImplementationAndControl;
  current_file: Thumbnail;

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
    this.dataFormExecutiveSummary = this.formBuilder.group(implementationAndControlConfig);
    this.dataFormConcept = this.formBuilder.group(conceptConfig);
    this.dataFormPrototype = this.formBuilder.group(prototypeConfig);
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

      this.vcwPhasesService.getConcept(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwConcept = data;
          this.isEditing = true;
          this.dataFormConcept.controls.concept.patchValue(this.vcwConcept.concept);

        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getPrototype(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwPrototype = data;
          this.isEditing = true;
          this.dataFormPrototype.controls.prototype.patchValue(this.vcwPrototype.prototype);
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

      this.vcwPhasesService.getImplementationAndControl(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          
          this.vcwImplementation = data;
          this.isEditing = true;
          this.dataFormExecutiveSummary.controls.executiveSummary.patchValue(this.vcwImplementation.executiveSummary);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getAttachment(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe( data =>{
        if(data){
          this.current_file = data;
          this.isEditing = true;

        }
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
  }

  downloadFile(filePath: string){
    window.open(filePath);
  }

  setVisibility(formGroup: string, visible: boolean){
    return this.visibilty[formGroup]= visible;
  }

}
