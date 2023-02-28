import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { challengeConfig, Idea, PhaseNavigationService, selectIdeasConfig, VcwPhasesService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faFloppyDisk, faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../../../environments/environment';

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

  ideas: Idea[];

  useMocks: boolean;


  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private vcwPhasesService: VcwPhasesService,
      private vcwMockService: VcwMockService,
    ){

  }

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    if (this.useMocks){
      this.vcwMockService.getIdeas().subscribe(
      data => this.ideas = data);
    } else{
      this.vcwPhasesService.getIdeas(this.vcwId, this.projectId).subscribe(
        data => this.ideas = data);
    }

  }

  onSave() {
  }

  isFormValid(control: string) {
  }

  toggleSelected(id: number): void {
    if (!this.useMocks){
      const ideaData = this.ideas.find(idea => idea.id === id);
      ideaData.isSelected = !ideaData.isSelected;
      this.vcwPhasesService.editIdea(this.vcwId, this.projectId, id, ideaData)
      .subscribe(data =>{
        this.ideas.find(idea => idea.id === id).isSelected = !this.ideas.find(idea => idea.id === id).isSelected;
      });
    } else {
      this.ideas.find(idea => idea.id === id).isSelected = !this.ideas.find(idea => idea.id === id).isSelected;
    }
  }

  getIcon(value: string): IconDefinition {
    if (value) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

}
