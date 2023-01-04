import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
  @Input() label = 'Input label';

  constructor() {}

  ngOnInit(): void {}
}
