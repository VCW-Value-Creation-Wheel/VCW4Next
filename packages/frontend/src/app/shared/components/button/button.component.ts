import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() iconClass = '';

  @Input() label = 'Button label';
  @Input() leftIcon?: IconDefinition;
  @Input() rightIcon?: IconDefinition;
  @Input() isSecondary = false;
  @Input() isTransparent = false;
  @Input() isSuccess = false;
  @Input() isDangerous = false;
  @Input() isDisabled = false;
  @Input() isWhite = false;
  @Input() isFull = false;
  @Input() type = 'button';
  @Input() noLabel = false;
  @Input() isRounded = false;
  @Output() buttonClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.buttonClick.emit();
  }
}
