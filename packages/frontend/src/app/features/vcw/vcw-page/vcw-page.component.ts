import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vcw-page',
  templateUrl: './vcw-page.component.html',
  styleUrls: ['./vcw-page.component.scss']
})
export class VcwPageComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  vcwType: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.vcwType = 'method';
  }

  onClick(id: string) {
    this.router.navigate(['phases/' + id], {relativeTo: this.activatedRoute});
  }

  onBack() {
    this.router.navigate(['../../'], {relativeTo: this.activatedRoute});
  }
}
