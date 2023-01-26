import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, PhaseNavigationService, selectIdeasConfig } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

interface Idea {
  id: number;
  name: string;
  lang?: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-select-ideas',
  templateUrl: './select-ideas.component.html',
  styleUrls: ['./select-ideas.component.scss']
})
export class SelectIdeasComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;

  ideas: Idea[] = [
    {
      id : 1,
      name: 'Portugal',
      isSelected: false
    },
    {
      id : 2,
      name: 'Spain',
      isSelected: false
    },
    {
      id : 3,
      name: 'France',
      isSelected: false
    },
  ]

  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder
    ){
    this.dataForm = this.formBuilder.group(selectIdeasConfig);
  }

  ngOnInit(): void {
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });
  }

  onSave() {
  }

  isFormValid(control: string) {
  }

  toggleSelected(id: number): void {
    this.ideas.find(idea => idea.id === id).isSelected = !this.ideas.find(idea => idea.id === id).isSelected;
  }

}
