import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, Idea, PhaseNavigationService, selectIdeasConfig, VcwPhasesService } from '@core';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-select-ideas',
  templateUrl: './select-ideas.component.html',
  styleUrls: ['./select-ideas.component.scss']
})
export class SelectIdeasComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;

  dataForm: UntypedFormGroup;

  vcwId: number;
  projectId: number;

  ideas: Idea[] = [
    {
      id : 1,
      name: 'Portugal',
      isSelected: false,
      sourceName:'portugal',
      sourceUrl: 'testeUrl',
      entryTypeId: 1,
    },
    {
      id : 2,
      name: 'Spain',
      isSelected: false,
      sourceName:'spain',
      sourceUrl: 'testeUrl',
      entryTypeId: 1,
    },
    {
      id : 3,
      name: 'France',
      isSelected: false,
      sourceName:'france',
      sourceUrl: 'testeUrl',
      entryTypeId: 1,
    },
  ]


  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private formBuilder: FormBuilder,
      private vcwPhasesService: VcwPhasesService,
    ){
    this.dataForm = this.formBuilder.group(selectIdeasConfig);
  }

  ngOnInit(): void {
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
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
    let ideaData = this.ideas.find(idea => idea.id === id);
    this.vcwPhasesService.editIdea(this.vcwId, this.projectId, id, ideaData);
  }

}
