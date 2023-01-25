import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, PhaseNavigationService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { isValid } from 'date-fns';
import { CkeditorConfig } from 'shared/components/form/cke-editor/cke-editor.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;

  constructor(
    private phaseNavService: PhaseNavigationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ){
    this.dataForm = this.formBuilder.group(challengeConfig);
  }
  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {
    console.log(this.isFormValid('challenge'));
  }

  isFormValid(control: string) {
    return this.dataForm.get(control).valid;
  }

}
