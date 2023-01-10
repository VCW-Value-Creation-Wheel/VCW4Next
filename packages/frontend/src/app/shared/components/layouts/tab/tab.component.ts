import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() isActive = false;
  @Input() label?: string;
  @Output() clicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {}

  activeClass() {
    return {
      'bg-gray-50 !text-secondary-500 font-medium border-b-2 border-primary-500':
        this.isActive,
      'bg-transparent': !this.isActive,
    };
  }
}
