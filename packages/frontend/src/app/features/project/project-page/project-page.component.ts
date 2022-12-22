import { Component, Input, OnInit } from '@angular/core';
import { VCW } from '@core/models/vcw';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  @Input() projectId: number=1;

  faPlus = faPlus;
  vcws: VCW[] = [];

  constructor( private vcwService: VcwMockService) { }

  ngOnInit(): void {
    // this loads a mock for testing. Disable this when loading from the back-end.
    this.vcwService.getVcws(this.projectId).subscribe((vcws => this.vcws = vcws));
  }

  onVcwClick(vcw: VCW) {
    console.log(vcw);
  }

  addNewVcw() {
    console.log('New Project');
  }

}
