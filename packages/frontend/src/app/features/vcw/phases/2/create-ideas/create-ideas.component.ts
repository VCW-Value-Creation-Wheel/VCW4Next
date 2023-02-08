import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
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

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dataFormArray = this.formBuilder.array([]);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {
    this.actionConfirmTitle = 'Save changes';
    this.actionConfirmText = 'Save the changes to this phase?';
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe((userConfirm) => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        console.log('save');
      } else {
        console.log('not save');
      }
    });
  }

  onAddIdea() {
    this.dataform = this.formBuilder.group(createIdeasConfig);
    this.itemDialogOpen = true;
  }

  onCancel() {
    this.itemDialogOpen = false;
    this.editIdeaMode = false;
  }

  onConfirm() {
    // add idea to list. If from file, perform a request first then add idea if the response is successful.
    this.itemDialogOpen = false;
    if (!this.editIdeaMode) {
      this.dataFormArray.push(this.dataform);
    } else {
      this.editIdeaMode = false;
    }
  }

  editIdea(index: number) {
    this.editIdeaMode = true;
    this.itemDialogOpen = true;
    this.dataform = (this.dataFormArray.at(index) as UntypedFormGroup);
  }

  deleteIdea(index: number, ideaNameControl: AbstractControl) {
    // call confirm dialog then delete idea
    this.actionConfirmTitle = 'Delete Idea';
    this.actionConfirmText = `Are you sure you want to delete the idea "${ideaNameControl.value}"?`;
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        this.dataFormArray.removeAt(index);
      }
    });
  }

  getIcon(ideaSourceControl: AbstractControl): IconDefinition {
    if (ideaSourceControl?.value) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

  onActionCancel() {
    this.actionConfirm$.next(false);
  }

  onActionConfirm() {
    this.actionConfirm$.next(true);
  }
}
