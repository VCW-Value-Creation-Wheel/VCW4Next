import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService, vcwConfig, VcwService } from '@core';
import { take } from 'rxjs/operators';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-vcw',
  templateUrl: './new-vcw.component.html',
  styleUrls: ['./new-vcw.component.scss']
})
export class NewVcwComponent implements OnInit {
  dataForm: UntypedFormGroup;

  vcwTypes = {
    1: 'sprint',
    2: 'method',
    3: 'meta-framework'
  };

  isSelected = 0;

  projectId: number;

  faArrowLeft = faArrowLeft;

  constructor(private formBuilder: FormBuilder,
              private vcwService: VcwService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private route: ActivatedRoute,
              private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group(vcwConfig);

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
  }

  selectedImage(num: number): void{
    this.isSelected = num;
    this.dataForm.controls.type.setValue(this.vcwTypes[num]);
  }

  onSubmit(): void{
    if (this.dataForm.valid) {
      this.vcwService.createVcw(this.projectId, this.dataForm.value)
      .pipe(take(1)).subscribe((response) => {
        this.snackbar.success('Success!', 'New VCW successfully created.').during(3000).show();
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
      }, (error) => {
        this.snackbar.danger('Error!', 'Could not create a new VCW. Please try again later.').during(3000).show();
      });
    } else {
      this.snackbar.danger('Not Valid', 'Please check your form.').during(3000).show();
    }
  }

  onBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
