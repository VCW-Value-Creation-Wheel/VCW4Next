import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VCW } from '@core/models/vcw';

const wheel1Path = "../../../../assets/img/wheel1vcw.jpg"

@Component({
  selector: 'app-vcw-card',
  templateUrl: './vcw-card.component.html',
  styleUrls: ['./vcw-card.component.scss']
})
export class VcwCardComponent implements OnInit {

  @Input() vcw: VCW;
  @Output() clickEvent = new EventEmitter();

  photo: string;

  constructor() {}

  ngOnInit(): void {
    this.photo = wheel1Path
  }

  onClickEvent() {
    this.clickEvent.emit();
  }

}
