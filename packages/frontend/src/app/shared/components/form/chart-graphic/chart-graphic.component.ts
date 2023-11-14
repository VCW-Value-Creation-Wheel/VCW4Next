import { Component, Input, OnChanges, OnInit, SimpleChanges, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueTableService } from '@core/services/value-table/value-table.service';
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

  myChart:Chart;

  constructor(public changeTable: ValueTableService ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if(this.myChart){
      this.myChart.destroy();
    }

    this.getData();

    this.changeTable.changeTable$.subscribe((change:boolean)=>{
      if(change === true){
        this.myChart.destroy();
      }
    })

  }

  @Input() values:Map<string,number[]>;
  @Input() labels: string[];

  backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(235, 174, 54, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(146, 104, 246, 0.2)',
    'rgba(109, 190, 191, 0.2)',
  ];

  borderColors = [
    'rgba(255, 99, 132)',
    'rgba(235, 174, 54)',
    'rgba(54, 162, 235)',
    'rgba(146,104,246)',
    'rgba(109, 190, 191)',
  ];

  

  ngOnInit(): void {
    if(this.myChart){
      this.myChart.destroy();
    }

    this.getData();
    
    this.changeTable.changeTable$
    
};

getData(){

  const dataSets = [];
  Array.from(this.values.keys()).forEach((key,i) =>{
    dataSets.push({
      label: key,
      data: this.values.get(key),
      fill: true,
      backgroundColor: this.backgroundColors.slice(0,this.values.size),
      borderColor: this.borderColors[i],
      pointBackgroundColor:  this.borderColors[i],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: this.borderColors[i]
    })
 
  })

  const data = {
      
    labels: this.labels,
    datasets: dataSets
  };

   this.myChart = new Chart("myChart", {
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
