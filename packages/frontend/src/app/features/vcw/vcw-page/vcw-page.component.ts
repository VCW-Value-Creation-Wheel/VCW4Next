import { Component } from '@angular/core';

@Component({
  selector: 'app-vcw-page',
  templateUrl: './vcw-page.component.html',
  styleUrls: ['./vcw-page.component.scss']
})
export class VcwPageComponent {

  onClick(id: string) {
    console.log(id)
  }
}
