import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ipms-project-status-tag',
  templateUrl: './project-status-tag.component.html',
  styleUrls: ['./project-status-tag.component.scss'],
})
export class ProjectStatusTagComponent implements OnInit {

  @Input()
  @HostBinding('style.color')
  @HostBinding('style.border-color')
  public color: string = `#3877c5`;

  constructor() { 

  }

  public ngOnInit() {

  }

}
