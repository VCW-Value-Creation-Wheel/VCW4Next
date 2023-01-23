import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vcw-interactive',
  templateUrl: './vcw-interactive.component.html',
  styleUrls: ['./vcw-interactive.component.scss']
})
export class VcwInteractiveComponent implements OnInit, AfterViewInit {
$event: any;


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    // const section = document.getElementsByTagName('g');
    // console.log(section)
    // // tslint:disable-next-line: prefer-for-of
    // for (let i = 0; i < section.length; i++) {
    //   section[i].addEventListener('click', (event) => {
    //     console.log(event.target)
    //   })
    // }
  }
  
  onSVGClick(event: any) {
    console.log(event)
    console.log('hi')
  }

  
}
