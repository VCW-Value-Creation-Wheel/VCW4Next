import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-vcw',
  templateUrl: './new-vcw.component.html',
  styleUrls: ['./new-vcw.component.scss']
})
export class NewVcwComponent implements OnInit {
  form = new FormGroup({
    'title': new FormControl('', Validators.required)
  })

  labelTitle:String = "Title";
  placeholder: String = "";
  buttonLabel: String = "Submit";
  isSelected: number = 0;
  selectedBg: string = "bg-blue-200";
  noBg: string = "bg-transparent";
  

  constructor() { }

  ngOnInit(): void {
  }

  SelectedImage(number): void{
    this.isSelected = number;
  }

  onSubmit(): void{
  }

}
