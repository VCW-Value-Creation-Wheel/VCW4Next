import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VCW, VcwService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vcw-page',
  templateUrl: './vcw-page.component.html',
  styleUrls: ['./vcw-page.component.scss']
})
export class VcwPageComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  // vcwType: string;
  projectId: number;
  vcwId: number;

  vcw$: Observable<VCW>;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwService: VcwService,
              private vcwMockService: VcwMockService) {}

  ngOnInit(): void {
    // this.vcwType = 'method';
    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);
    this.vcw$ = this.vcwMockService.getVcwById(this.vcwId);
    // this.vcw$ = this.vcwService.getVcw(this.projectId, this.vcwId);
  }

  onClick(id: string) {
    this.router.navigate(['phases/' + id], {relativeTo: this.activatedRoute});
  }

  onBack() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }
}
