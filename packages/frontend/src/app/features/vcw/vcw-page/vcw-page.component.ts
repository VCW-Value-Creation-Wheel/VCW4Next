import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VCW, VcwService } from '@core';
import { VcwMockService } from '@core/services/mocks/vcw/vcw-mock.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

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

  useMocks: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private vcwService: VcwService,
              private vcwMockService: VcwMockService) {}

  ngOnInit(): void {
    this.useMocks = environment.activateMocks;

    this.projectId = parseInt(this.activatedRoute.snapshot.paramMap.get('project_id'), 10);
    this.vcwId = parseInt(this.activatedRoute.snapshot.paramMap.get('vcw_id'), 10);

    // mock
    if (this.useMocks) {
      this.vcw$ = this.vcwMockService.getVcwById(this.vcwId);
    } else {
      this.vcw$ = this.vcwService.getVcw(this.projectId, this.vcwId);
    }
  }

  onClick(id: string) {
    this.router.navigate(['phases/' + id], {relativeTo: this.activatedRoute});
  }

  onBack() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }
}
