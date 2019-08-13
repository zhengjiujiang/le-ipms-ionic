import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'ipms-project-jnduvdtl',
  templateUrl: './project-jnduvdtl.component.html',
  styleUrls: ['./project-jnduvdtl.component.scss'],
})
export class ProjectJnduvdtlComponent implements OnInit {
  @Input()
  public code: any;
  @Input()
  public date: any;

  @Input()
  public progress: any;

  public data: any;
  public keyLinkData: Array<any> = new Array<any>();
  public milestoneData: any;
  constructor(
      private readonly projectService: ProjectService,
  ) {

  }

  public ngOnInit() {
    this.getData()
  }
  ngOnChanges(){ // 用于监控父组件传递的数据变化
    this.getData()
  }
  public getData(){
    this.getmilestone(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.milestoneData = response.targets.project_milestone.filter(item => item.completeDate === null).filter((_, index) => index === 0)[0];
        }))
        .subscribe()
    this.getKeyLink(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.keyLinkData = response;
          this.keyLinkData.map(val => {
            val['planStartDateTimestamp'] =  new Date(val.planStartDate).getTime();
            val['planCompleteDateTimestamp'] =  new Date(val.planCompleteDate).getTime() < new Date().getTime() ? new Date().getTime() : new Date(val.planCompleteDate).getTime();
            val['startDateTimestamp'] =  new Date(val.startDate).getTime();
            val['completeDateTimestamp'] =  new Date(val.completeDate).getTime() < new Date().getTime() ? new Date().getTime() : new Date(val.completeDate).getTime();
            val['nowDateTimestamp'] = new Date().getTime();
          })

        }))
        .subscribe()
  }

  /**
   * 获取里程碑
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getmilestone(projectCode: string, dimYear:string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_schedule',  ["project_milestone"])
        .pipe(map(response => response.data))
    // .pipe(map(data => data.targets['view_project_info']));
  }

  /**
   * 获取项目关键环节
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getKeyLink(projectCode: string, dimYear:string, dimMonth: string){
    return this.projectService.getKeyLink(projectCode, dimYear, dimMonth)
        .pipe(map(response => response.data))
  }
}
