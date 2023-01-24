import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vcw-interactive',
  templateUrl: './vcw-interactive.component.html',
  styleUrls: ['./vcw-interactive.component.scss']
})
export class VcwInteractiveComponent implements OnInit {

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
