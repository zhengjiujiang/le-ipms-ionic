import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ipms-chris-progress-bar',
  styleUrls: ['./chris-progress-bar.component.scss'],
  templateUrl: './chris-progress-bar.component.html',
})
export class ChrisProgressBarComponent implements OnInit {
  @Input()
  public unit: string = '';
  
  @Input()
  public value: number;

  @Input()
  public negativeValue: number;

  @Input()
  public showValue: boolean = true;

  @Input()
  public color: string;
  
  @Input()
  public points: Array<number>;
  
  @Input()
  public endValue: number;

  @Input()
  public startValue: number;

  @Input()
  public showNegative : boolean = false;

  get progress() {
    return ((this.value - this.startValue) / (this.endValue - this.startValue)) * 100;
  }
  get getNegativeProgress(){
    return ((this.negativeValue - this.startValue) / (this.endValue - this.startValue)) * 100;
  }
  constructor() { 

  }

  public ngOnInit() {
  }

  public getPointProgress(point: number) {
    return ((point - this.startValue) / (this.endValue - this.startValue)) * 100;
  }
}
