import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCheck, faTimes, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  dialogSize = '';
  convertSize: { [key: string]: string } = {
    sm: 'sm:w-5/12 md:w-4/12 lg:w-3/12',
    md: 'sm:w-7/12 md:w-6/12 lg:w-6/12',
    lg: 'sm:w-9/12 md:w-8/12 lg:w-9/12',
    xl: 'sm:w-11/12 md:w-10/12 lg:w-11/12',
  };

  faCheck = faCheck;
  faTimes = faTimes;
  faCircleNotch = faCircleNotch;

  @Input() classes?: string;
  @Input() noConfirmButton = false;
  @Input() noCancelButton = false;
  @Input() title?: string;
  @Input() titleSize?: string;
  @Input() confirmText?: string;
  @Input() confirmDisabled = false;
  @Input() cancelText?: string;
  @Input() buttonVariant: 'solid' | 'transparent' | 'solid red' = 'solid';
  @Input() size = 'md';
  @Input() awaitingAction = false;

  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.dialogSize = this.convertSize[this.size];
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
