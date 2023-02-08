import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createIdeasConfig, Idea, PhaseNavigationService } from '@core';
import { faFloppyDisk, faUser, IconDefinition, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-ideas',
  templateUrl: './create-ideas.component.html',
  styleUrls: ['./create-ideas.component.scss']
})
export class CreateIdeasComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;

  dataFormArray: UntypedFormArray;
  dataform: UntypedFormGroup;
  editIdeaMode = false;
  editIdeaIndex: number;
  itemDialogOpen = false;
  confirmDialogOpen = false;

  ideasList: Idea[] = [];

  actionConfirmText: string;
  actionDelete$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dataFormArray = new UntypedFormArray([]);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {

  }

  onAddIdea() {
    this.dataform = this.formBuilder.group(createIdeasConfig);
    this.dataFormArray.push(this.dataform);
    this.itemDialogOpen = true;
  }

  onCancel() {
    this.itemDialogOpen = false;
    if (!this.editIdeaMode) {
      this.dataFormArray.removeAt(this.dataFormArray.length - 1);
    } else {
      this.editIdeaMode = false;
    }
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
      this.ideasList[this.editIdeaIndex].name = this.dataform.controls.name.value;
      this.ideasList[this.editIdeaIndex].sourceName = this.dataform.controls.sourceName.value;
      this.ideasList[this.editIdeaIndex].sourceURL = this.dataform.controls.sourceUrl.value;
      this.ideasList[this.editIdeaIndex].entryType = this.dataform.controls.entryType.value;
    }
  }

  editIdea(idea: Idea) {
    this.editIdeaMode = true;
    this.itemDialogOpen = true;
    this.editIdeaIndex = this.ideasList.indexOf(idea);
    this.dataform = (this.dataFormArray.at(this.editIdeaIndex) as UntypedFormGroup);
  }

  deleteIdea(idea: Idea) {
    // call confirm dialog then delete idea
    this.actionConfirmText = `Are you sure you want to delete the idea "${idea.name}"?`;
    this.confirmDialogOpen = true;
    this.actionDelete$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        const index = this.ideasList.indexOf(idea);
        this.ideasList.splice(index, 1);
        this.dataFormArray.removeAt(index);
      }
    });
  }

  getIcon(idea: Idea): IconDefinition {
    if (idea.sourceName) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  onActionCancel() {
    this.actionDelete$.next(false);
  }

  onActionConfirm() {
    this.actionDelete$.next(true);
  }
}
