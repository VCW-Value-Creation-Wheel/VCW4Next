import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createIdeasConfig, Idea, PhaseNavigationService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-ideas',
  templateUrl: './create-ideas.component.html',
  styleUrls: ['./create-ideas.component.scss']
})
export class CreateIdeasComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;
  
  dataform: UntypedFormGroup;
  editIdeaMode = false;
  itemDialogOpen = true;

  ideasList: Idea[] = [];

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dataform = this.formBuilder.group(createIdeasConfig);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {

  }

  onCancel() {
    this.itemDialogOpen = false;
    this.editIdeaMode = false;
    console.log(this.dataform)
  }

  onConfirm() {
    // add idea to list. If from file, perform a request first then add idea if the response is successful.
    this.itemDialogOpen = false;
    if (!this.editIdeaMode) {
      this.ideasList.push({
        name: this.dataform.controls.name.value,
        sourceName: this.dataform.controls.sourceName.value,
        sourceURL: this.dataform.controls.sourceUrl.value,
        entryType: this.dataform.controls.entryType.value
      });
    } else {
      this.editIdeaMode = false;
    }
  }

  editIdea(idea: Idea) {
    this.editIdeaMode = true;
    this.itemDialogOpen = true;
  }

  deleteIdea(idea: Idea) {

  }

  /* TO DO LIST
    1 - create form: Formarray, where each entry is an idea
    2 - idea form attributes: name, entryTypeId, sourceName, sourceDescription (DONE)
    3 - create dialog for new idea, 2 tabs for manual & from file (IN PROGRESS)
      3.1 - IMPLMENT VALUE ACCESSOR FOR FILE INPUT
    4 - display all ideas as a list, with options to edit and delete.
  */
}
