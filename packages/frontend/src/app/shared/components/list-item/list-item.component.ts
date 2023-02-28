import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  faUser = faUser;
  faEdit = faEdit;
  faTrash = faTrash;

  @Input() mainBgColor = 'bg-blue-100';
  @Input() selectedBgColor = 'bg-green-200';
  @Input() isEditable = true;
  @Input() isSelectable = false;
  @Input() value: string;
  @Input() icon?: IconDefinition;
  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  @Output() selectChange = new EventEmitter<boolean>();

  isSelected = false;

  constructor() {}

  ngOnInit(): void {

  }

  onEditClick() {
    this.editClick.emit();
  }

  onDeleteClick() {
    this.deleteClick.emit();
  }

  toggleSelect() {
    if (this.isSelectable) {
      this.isSelected = !this.isSelected;
      this.selectChange.emit(this.isSelected);
    }
  }

  get bgColor() {
    if (this.isSelectable) {
      if (this.isSelected) {
        return this.selectedBgColor;
      } else {
        return this.mainBgColor;
      }
    } else {
      return this.mainBgColor;
    }
  }

}
