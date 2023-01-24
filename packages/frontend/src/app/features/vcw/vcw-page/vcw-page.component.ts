import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcw-page',
  templateUrl: './vcw-page.component.html',
  styleUrls: ['./vcw-page.component.scss']
})
export class VcwPageComponent implements OnInit {

  vcwType: string;

  ngOnInit(): void {
    this.vcwType = 'sprint';
  }

  onClick(id: string) {
    console.log(id)
  }
}
