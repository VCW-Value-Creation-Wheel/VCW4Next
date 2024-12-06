import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vcw-method',
  templateUrl: './vcw-method.component.html',
  styleUrls: ['./vcw-method.component.scss']
})
export class VCWMethodComponent implements OnInit {

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
