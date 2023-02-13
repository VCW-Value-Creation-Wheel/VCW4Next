import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { createIdeasConfig, Idea, PhaseNavigationService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import {
  faFloppyDisk,
  faUser,
  IconDefinition,
  faGlobe,
  faPlus,
  faTimes,
  faCheck,
  faWindowMaximize
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-ideas',
  templateUrl: './create-ideas.component.html',
  styleUrls: ['./create-ideas.component.scss']
})
export class CreateIdeasComponent implements OnInit {

  faFloppyDisk = faFloppyDisk;
  faPlus = faPlus;
  faTimes = faTimes;
  faCheck = faCheck;
  faWindowMaximize = faWindowMaximize;

  dataFormArray: UntypedFormArray;
  dataform: UntypedFormGroup;
  editIdeaMode = false;
  editIdeaIndex: number;
  itemDialogOpen = false;
  confirmDialogOpen = false;
  simpleInputOpen = false;

  initialFormValue: any[];
  hasChanged = false;

  actionConfirmText: string;
  actionConfirmTitle: string;
  actionConfirm$: Subject<boolean> = new Subject();

  constructor(private phaseNavService: PhaseNavigationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private mockService: VcwMockService) {}

  ngOnInit(): void {
    this.dataFormArray = this.formBuilder.array([]);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
        this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
    /*
      Here should be performed a request to the back-end, to check and fetch existing data.
    */
    this.mockService.getIdeas().pipe(take(1)).subscribe((data) => {
      data.forEach(d => {
        this.dataFormArray.push(this.formBuilder.group(createIdeasConfig));
        this.dataFormArray.at(this.dataFormArray.length - 1).patchValue(d);
      });
    });
  }

  // onSave() {
  //   this.actionConfirmTitle = 'Save changes';
  //   this.actionConfirmText = 'Save the changes to this phase?';
  //   this.confirmDialogOpen = true;
  //   this.actionConfirm$.pipe(take(1)).subscribe((userConfirm) => {
  //     this.confirmDialogOpen = false;
  //     if (userConfirm) {
  //       /* Perform a request to the back-end to save changes. After receiving a successful response from the back-end,
  //       indicating that all changes were saved, execute the two lines below in the callback.
  //       */
  //       this.hasChanged = false;
  //       this.initialFormValue = this.dataFormArray.getRawValue();
  //     }
  //   });
  // }

  onAddIdea() {
    this.dataform = this.formBuilder.group(createIdeasConfig);
    this.simpleInputOpen = true;
    this.dataform.controls.file.disable({onlySelf: true});
  }

  onDirectAdd() {
    // send request to back-end. On successful response, push to data form array.
    this.dataFormArray.push(this.dataform);
    this.simpleInputOpen = false;
  }

  onOpenDialog() {
    this.itemDialogOpen = true;
  }

  onCancel() {
    this.itemDialogOpen = false;
    this.editIdeaMode = false;
    this.simpleInputOpen = false;
  }

  onConfirm() {
    // add idea to list. If from file, perform a request first then add idea if the response is successful.
    this.itemDialogOpen = false;
    if (!this.editIdeaMode) {
      // send request to back-end. On successful response, push to data form array.
      this.dataFormArray.push(this.dataform);
      this.simpleInputOpen = false;
    } else {
      // send request to back-end. If successful, change the previous values in the form array.
      this.dataFormArray.at(this.editIdeaIndex).patchValue(this.dataform.value);
      this.editIdeaMode = false;
    }
  }

  editIdea(index: number) {
    this.editIdeaMode = true;
    this.itemDialogOpen = true;
    this.dataform = this.formBuilder.group(createIdeasConfig);
    this.dataform.patchValue(this.dataFormArray.at(index).value);
    this.editIdeaIndex = index;
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

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onDirectAdd();
    }
  }
}
