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
  @Input() users:string[] = [];
  @Input() values:number[] = [];

  ngOnInit(): void {

    this.getData();
  
    
};

getData(){
  const data = {
      
    labels: this.labels,
    datasets: [{
      label: this.users[0],
      data: [this.values[0],this.values[1],this.values[2],this.values[3],this.values[4]],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
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
