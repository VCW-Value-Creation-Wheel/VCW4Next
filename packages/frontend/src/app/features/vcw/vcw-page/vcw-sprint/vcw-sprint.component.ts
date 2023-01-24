import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vcw-sprint',
  templateUrl: './vcw-sprint.component.html',
  styleUrls: ['./vcw-sprint.component.scss']
})
export class VcwSprintComponent implements OnInit {

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
