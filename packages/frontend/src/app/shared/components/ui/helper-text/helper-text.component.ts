import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-helper-text',
  templateUrl: './helper-text.component.html',
  styleUrls: ['./helper-text.component.scss'],
})
export class HelperTextComponent implements OnInit {
  @Input() text?: string;
  @Input() error = false;
  constructor() {}

  ngOnInit(): void {}
}
