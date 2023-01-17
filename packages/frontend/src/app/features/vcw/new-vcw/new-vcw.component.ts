import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-vcw',
  templateUrl: './new-vcw.component.html',
  styleUrls: ['./new-vcw.component.scss']
})
export class NewVcwComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required)
  });

  isSelected = 0;


  constructor() { }

  ngOnInit(): void {
  }

  selectedImage(num: number): void{
    this.isSelected = num;
  }

  onSubmit(): void{
  }

}
