import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ipms-radio-button',
  styleUrls: ['./radio-button.component.scss'],
  templateUrl: './radio-button.component.html',
})
export class RadioButtonComponent implements OnInit {
  @Input()
  public items: Array<{ text: string, code: string|number }>;
  
  @Input()
  public activeCode: string|number;
  @Output()
  public activeCodeChange: EventEmitter<string|number> = new EventEmitter();

  constructor() { 

  }

  public ngOnInit() {

  }

  public onItemClick(item: { text: string, code: string|number }) {
    this.activeCode = item.code;
    this.activeCodeChange.emit(item.code);
  }

}
