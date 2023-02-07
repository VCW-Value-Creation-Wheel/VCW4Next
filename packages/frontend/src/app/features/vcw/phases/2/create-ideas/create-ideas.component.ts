import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createIdeasConfig, PhaseNavigationService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-ideas',
  templateUrl: './create-ideas.component.html',
  styleUrls: ['./create-ideas.component.scss']
})
export class CreateIdeasComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;
  
  dataform: UntypedFormGroup;

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
                this.dataform = formBuilder.group(createIdeasConfig);
              }

  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {

  }

  /* TO DO LIST
    1 - create form: Formarray, where each entry is an idea
    2 - idea form attributes: name, entryTypeId, sourceName, sourceDescription (DONE)
    3 - create dialog for new idea, 2 tabs for manual & from file (IN PROGRESS)
      3.1 - IMPLMENT VALUE ACCESSOR FOR FILE INPUT
    4 - display all ideas as a list, with options to edit and delete.
  */
}
