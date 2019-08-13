import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ipms-progress-wrapper',
  templateUrl: './progress-wrapper.component.html',
  styleUrls: ['./progress-wrapper.component.scss'],
})
export class ProgressWrapperComponent implements OnInit {
  @Input()
  public name: string;
  @Input()
  public data: any;
  public imageUrl: string;
  constructor() { 

  }

  public ngOnInit() {
    /**
     * 根据id设置标题icon（未完）
     * */
    if (this.data.id <= 3){
      this.imageUrl = '../../../../../assets/images/5.svg';
    } else if (this.data.id > 3 && this.data.id <= 6) {
      this.imageUrl = '../../../../../assets/images/5.svg';
    } else if (this.data.id === 7) {
      this.imageUrl = '../../../../../assets/images/5.svg';
    } else if (this.data.id === 8) {
      this.imageUrl = '../../../../../assets/images/5.svg';
    }
  }

}
