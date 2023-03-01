import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { faCheck, faTimes, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simple-item-input',
  templateUrl: './simple-item-input.component.html',
  styleUrls: ['./simple-item-input.component.scss']
})
export class SimpleItemInputComponent implements OnInit {

  faCheck = faCheck;
  faTimes = faTimes;
  faWindowMaximize = faWindowMaximize;

  @Input() dataForm: UntypedFormGroup;
  @Input() formControlFieldName = 'name';
  @Input() placeholderText = 'Type something...';
  @Input() simpleInterface = false;
  @Output() keyPressed = new EventEmitter<KeyboardEvent>();
  @Output() addClicked = new EventEmitter();
  @Output() cancelClicked = new EventEmitter();
  @Output() openDialogClicked = new EventEmitter();

  ngOnInit(): void {

  }

  onKeyPress(event: KeyboardEvent) {
    this.keyPressed.emit(event);
  }

  onAdd() {
    this.addClicked.emit();
  }

  onCancel() {
    this.cancelClicked.emit();
  }

  onOpenDialog() {
    this.openDialogClicked.emit();
  }
}
