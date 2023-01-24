import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vcw-journey',
  templateUrl: './vcw-journey.component.html',
  styleUrls: ['./vcw-journey.component.scss']
})
export class VcwJourneyComponent implements OnInit {

  @Output() vcwAreaClicked = new EventEmitter<string>();

  ngOnInit(): void {

  }

  onSVGClick(event: Event) {
    const target = (event.target['id'] as string);
    if (target.includes('phase')) {
      this.vcwAreaClicked.emit(target.split('-')[1]);
    }
  }
}
