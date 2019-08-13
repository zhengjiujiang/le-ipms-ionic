import { Project } from 'src/app/models/public_api';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PROJECT_LEVEL_COLORS } from '../../constants/project-level';

@Component({
  selector: 'ipms-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  public projectLevelColors = PROJECT_LEVEL_COLORS;

  @Input()
  public projects: Array<Project>;

  @Output()
  public projectClick: EventEmitter<Project> = new EventEmitter();

  constructor() {

  }

  public ngOnInit() {

  }
  
  public onProjectClick(project: Project, _event: MouseEvent) {
    this.projectClick.emit(project);
  }

}
