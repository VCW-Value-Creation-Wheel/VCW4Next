import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent implements OnInit {
  @Input() icon!: IconDefinition;
  @Input() disabled!: boolean;
  @Input() label?: string;
  @Input() textColor?: string;
  @Input() hover?: string;
  @Input() background?: string;
  @Output() btnClick = new EventEmitter();
  class = '';

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
