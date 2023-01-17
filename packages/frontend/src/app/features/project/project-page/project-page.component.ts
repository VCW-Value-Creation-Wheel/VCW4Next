import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProjectService, Project } from '@core';
import { VCW } from '@core/models/vcw';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  project: Project;

  faPlus = faPlus;
  vcws: VCW[] = [];

  constructor( 
    private vcwService: VcwMockService,
    private mockProjectService: MockProjectService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.mockProjectService.getById(Number(this.route.snapshot.paramMap.get('project_id'))).subscribe(project =>{
      this.project = project;
      this.vcwService.getVcws(this.project.id).subscribe((vcws => this.vcws = vcws));
    });
    // this loads a mock for testing. Disable this when loading from the back-end.
  }

  onVcwClick(vcw: VCW) {
    this.router.navigate(['/vcw/' + vcw.id + '/phases/1a']);
  }

  addNewVcw() {
    this.router.navigate(['/vcw/new-vcw']);
  }

}
