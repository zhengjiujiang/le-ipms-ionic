import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'ipms-project-info-card',
  styleUrls: ['./project-info-card.component.scss'],
  templateUrl: './project-info-card.component.html',
  animations: [
    trigger('extra', [
      state('expand', style({
        
      })),
      state('unexpand', style({
        height: '0px',
      })),
      transition('expand <=> unexpand', [
        animate('0.2s'),
      ]),
    ]),
  ],
})
export class ProjectInfoCardComponent implements OnInit {

  @Input()
  public icon: string;

  @Input()
  public title: string;

  @Input()
  public expand: boolean = true;

  @Input()
  public expandable: boolean = true;
  
  @Output()
  public expandChange: EventEmitter<boolean> = new EventEmitter();

  @HostBinding('class.expand')
  get isExpand() {
    return this.expand;
  }

  constructor() { 

  }

  public ngOnInit() {

  }

}
