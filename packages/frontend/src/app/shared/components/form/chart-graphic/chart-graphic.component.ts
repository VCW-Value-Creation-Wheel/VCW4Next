import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-chart-graphic',
  templateUrl: './chart-graphic.component.html',
  styleUrls: ['./chart-graphic.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChartGraphicComponent),
      multi: true,
    },
  ],
})
export class ChartGraphicComponent implements OnInit, OnChanges{

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  @Input() labels:string[] = [];

  ngOnInit(): void {

    this.getData();
  
    
};

getData(){
  const data = {
      
    labels: this.labels,
    datasets: [{
      label: 'Sally',
      data: [4.1, 4.7, 4.5,4.8,5],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Steve',
      data: [4.9,4.4,4.4,4.1,4.8],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }, {
      label: 'Garry',
      data: [4.6,4.5,4.6,4.5,4.7],
      fill: true,
      backgroundColor: 'rgba(235, 174, 54, 0.2)',
      borderColor: 'rgb(235, 174, 54)',
      pointBackgroundColor: 'rgb(235, 174, 54)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(235, 174, 54)'
    }]
  };

  var myChart = new Chart("myChart", {
    type: 'radar',
data: data,
options: {
  elements: {
    line: {
      borderWidth: 3
    }
  }
},
  });


}


}
