import { Component, Input, OnInit } from '@angular/core';

interface Accept {
  [key: string]: string;
}

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent implements OnInit {
  @Input() label = 'Input label';
  @Input() accepts: Accept[] = [{ '*': '*' }];

  constructor() {}

  ngOnInit(): void {}
}
