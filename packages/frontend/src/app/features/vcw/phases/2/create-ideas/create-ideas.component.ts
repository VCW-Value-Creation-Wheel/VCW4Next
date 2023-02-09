import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
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

  initialFormValue: any[];
  hasChanged = false;

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
      if (this.hasChanged) {
        this.actionConfirmTitle = 'Unsaved changes';
        this.actionConfirmText = 'Unsaved changes will be lost if you change phase. Do you still want to proceed?';
        this.confirmDialogOpen = true;
        this.actionConfirm$.pipe(take(1)).subscribe(userConfirm => {
          this.confirmDialogOpen = false;
          if (userConfirm) {
            this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
          }
        });
      } else {
        this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
      }
    });
    /*
      Here should be performed a request to the back-end, to check and fetch existing data.
      The code below is used to actively check for unsaved changes.
    */
    this.initialFormValue = this.dataFormArray.getRawValue();
    this.dataFormArray.valueChanges.subscribe((value: FormArray) => {
      if (Object.keys(this.initialFormValue).length !== value.length) {
        this.hasChanged = true;
      } else {
        this.hasChanged = Object.keys(this.initialFormValue).some(key => {
          return this.dataFormArray.value[key] !== this.initialFormValue[key];
        });
      }
    });
  }

  onSave() {
    this.actionConfirmTitle = 'Save changes';
    this.actionConfirmText = 'Save the changes to this phase?';
    this.confirmDialogOpen = true;
    this.actionConfirm$.pipe(take(1)).subscribe((userConfirm) => {
      this.confirmDialogOpen = false;
      if (userConfirm) {
        /* Perform a request to the back-end to save changes. After receiving a successful response from the back-end,
        indicating that all changes were saved, execute the two lines below in the callback.
        */
        this.hasChanged = false;
        this.initialFormValue = this.dataFormArray.getRawValue();
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
