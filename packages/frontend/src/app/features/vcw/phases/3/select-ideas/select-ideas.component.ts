import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Idea, PhaseNavigationService, SnackbarService, VCWHasIdea, VcwPhasesService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faFloppyDisk, faGlobe, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../../../environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-select-ideas',
  templateUrl: './select-ideas.component.html',
  styleUrls: ['./select-ideas.component.scss']
})
export class SelectIdeasComponent implements OnInit{

  faFloppyDisk = faFloppyDisk;

  vcwId: number;
  projectId: number;

  ideas: Idea[];

  useMocks: boolean;


  constructor(
      private phaseNavService: PhaseNavigationService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private vcwPhasesService: VcwPhasesService,
      private snackbarService: SnackbarService
    ){}

  ngOnInit(): void {

    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.phaseNavService.nextPhase$.subscribe((nextPhase) => {
      this.router.navigate(['../' + nextPhase], {relativeTo: this.activatedRoute});
    });

    this.vcwPhasesService.getIdeas(this.vcwId, this.projectId).pipe(take(1)).subscribe(
      data => {
        this.ideas = data;
        if (this.ideas && this.ideas.length > 0) {
          this.vcwPhasesService.getSelectedIdeas(this.vcwId, this.projectId)
          .pipe((take(1))).subscribe((vcwIdeas) => {
            this.ideas.forEach((idea) => {
              idea.isSelected = vcwIdeas.find(vi => vi.id === idea.id).selected ?? false;
            })
          });
        }
      });
  }

  toggleSelected(idea: Idea): void {
    const ideaSelectedData: VCWHasIdea = {
      id: idea.id,
      vcwId: this.vcwId,
      selected: !idea.isSelected
    };
    this.vcwPhasesService.selectIdea(this.vcwId, this.projectId, idea.id, ideaSelectedData)
    .pipe(take(1)).subscribe((response) => {
      idea.isSelected = response.selected;
    }, (error) => {
      this.snackbarService.danger('Error!', 'Could not process your request. Please try again later.')
      .during(2000).show();
    });
  }

  getIcon(source: any): IconDefinition {
    if (source) {
      return faGlobe;
    } else {
      return faUser;
    }
  }

}
