import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhaseNavigationService, threeMsConfig, SnackbarService, VcwPhasesService, BusinessModelConfig } from '@core';
import { faFloppyDisk, faLink, faSquareCheck, faGift, faHeart, faUserGroup, faIndustry, faTruck, faTags, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { VCWBusinessModel, VCWThreeMs } from '@core/models';

@Component({
  selector: 'app-ms-and-business-model',
  templateUrl: './ms-and-business-model.component.html',
  styleUrls: ['./ms-and-business-model.component.scss']
})
export class MsAndBusinessModelComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;
  faLink = faLink;
  faSquareCheck = faSquareCheck;
  faGift = faGift;
  faHeart = faHeart;
  faUserGroup = faUserGroup;
  faIndustry = faIndustry;
  faTruck = faTruck;
  faTags = faTags;
  faSackDollar = faSackDollar;

  dataForm: UntypedFormGroup;
  dataBusinessForm: UntypedFormGroup;

  projectId: number;
  vcwId: number;
  isEditing = false;

  useMocks: boolean;

  vcwThreeMs: VCWThreeMs;
  vcwBusinessModel: VCWBusinessModel;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private vcwPhasesService: VcwPhasesService,
    private snackbarService: SnackbarService
  ){
    this.dataForm = this.formBuilder.group(threeMsConfig);
    this.dataBusinessForm = this.formBuilder.group(BusinessModelConfig);
  }

  ngOnInit(): void {

    this.useMocks = environment.activateMocks;

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    if (!this.useMocks) {
      this.vcwPhasesService.getThreeMs(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {

          this.vcwThreeMs = data;
          this.isEditing = true;
          this.dataForm.controls.threeMs.patchValue(this.vcwThreeMs.threeMs);
        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });

      this.vcwPhasesService.getBusinessModel(this.vcwId, this.projectId)
      .pipe(take(1))
      .subscribe(data => {
        if (data) {
          
          this.vcwBusinessModel = data;
          this.isEditing = true;

          Object.keys(this.dataBusinessForm.controls).forEach((key) =>{
            this.dataBusinessForm.controls[key].patchValue(this.vcwBusinessModel[key])
          });

        }
      }, error => {
        this.snackbarService.danger('Data Fetching Error', 'Unable to check and retrieve data from the server. Try again later.')
          .during(2000).show();
      });
    }
  }

  onSave() {
    if (this.isFormValid('threeMs')) {

      this.vcwThreeMs.threeMs = this.dataForm.controls.threeMs.value;

      if (this.isEditing) {
        this.vcwPhasesService.editThreeMs(this.vcwId, this.projectId, this.vcwThreeMs)
        .pipe(take(1))
        .subscribe(response => {
          this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
        }, error => {
          this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
          .during(2000).show();
        });
      } else {
        this.vcwPhasesService.createThreeMs(this.vcwId, this.projectId, this.vcwThreeMs)
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

  onSaveBusinessModel(){

      Object.keys(this.dataBusinessForm.controls).forEach((key) =>{
        this.vcwBusinessModel[key] = this.dataBusinessForm.controls[key].value;   
      })
    
      console.log(this.vcwBusinessModel)

      this.vcwPhasesService.editBusinessModel(this.vcwId,this.projectId, this.vcwBusinessModel)
      .pipe(take(1))
      .subscribe(response => {
        this.isEditing = true;
        this.snackbarService.success('Success!', 'Your changes were saved.').during(2000).show();
      }, error => {
        this.snackbarService.danger('Error', 'Unable to save your changes. Please try again later.')
        .during(2000).show();
      });
    

   
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }
}



