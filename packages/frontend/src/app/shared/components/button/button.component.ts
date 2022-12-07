import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() iconClass: string = "";

  @Input() label: string = 'Button label';
  @Input() leftIcon?: IconDefinition;
  @Input() rightIcon?: IconDefinition;
  @Input() isSecondary?: boolean = false;
  @Input() isTransparent?: boolean = false;
  @Input() isSuccess?: boolean = false;
  @Input() isDangerous?: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isWhite: boolean = false;
  @Input() isFull: boolean = false;
  @Input() type: string = 'button';
  @Input() noLabel: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
