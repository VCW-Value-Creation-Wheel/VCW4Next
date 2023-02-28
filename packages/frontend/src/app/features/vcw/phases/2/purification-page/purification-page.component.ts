import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createCriteriaConfig, createIdeasConfig, PhaseNavigationService, VcwPhasesService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-purification-page',
  templateUrl: './purification-page.component.html',
  styleUrls: ['./purification-page.component.scss']
})
export class PurificationPageComponent implements OnInit {

  faGlobe = faGlobe;
  faUser = faUser;

  useMocks: boolean;
  vcwId: number;
  projectId: number;

  ideaFormArray: UntypedFormArray;
  criteriaFormArray: UntypedFormArray;
  ideaDataForm: UntypedFormGroup;
  criteriaDataForm: UntypedFormGroup;

  selectedIdeaIndex: number;
  selectedCriteriaIndex: number;

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwPhasesService: VcwPhasesService,
              private mockService: VcwMockService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.ideaFormArray = this.formBuilder.array([]);
    this.criteriaFormArray = this.formBuilder.array([]);

    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
        this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);

    /*
      Here should be performed a request to the back-end, to check and fetch existing data.
      The code below is using mocks.
    */
    if (this.useMocks) {
      this.mockService.getIdeas().pipe(take(1)).subscribe((ideas) => {
        ideas.forEach(i => {
          this.ideaFormArray.push(this.formBuilder.group(createIdeasConfig));
          this.ideaFormArray.at(this.ideaFormArray.length - 1).patchValue(i);
        });
      });
      this.mockService.getCriteria().pipe(take(1)).subscribe((criteria) => {
        criteria.forEach(c => {
          this.criteriaFormArray.push(this.formBuilder.group(createCriteriaConfig));
          this.criteriaFormArray.at(this.criteriaFormArray.length - 1).patchValue(c);
        });
      });
    }
  }

  getIcon(ideaSourceControl: AbstractControl): IconDefinition {
    if (ideaSourceControl?.value) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  onIdeaSelect(index: number) {
    if (this.selectedIdeaIndex === index) {
      this.selectedIdeaIndex = undefined;
    } else {
      this.selectedIdeaIndex = index;
    }
  }

  onCriteriaSelect(index: number) {
    if (this.selectedCriteriaIndex === index) {
      this.selectedCriteriaIndex = undefined;
    } else {
      this.selectedCriteriaIndex = index;
    }
  }
}
