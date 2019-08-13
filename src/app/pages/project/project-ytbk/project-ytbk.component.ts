import { Component, OnInit, Input } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import { ProjectService } from '../../../services/project.service';
import { SettingsService } from '../../../services/settings.service';

@Component({
  selector: 'ipms-project-ytbk',
  templateUrl: './project-ytbk.component.html',
  styleUrls: ['./project-ytbk.component.scss'],
})
export class ProjectYtbkComponent implements OnInit {
  @Input()
  public code: any;
  @Input()
  public date: any;
  public monthlyReport: Array<any> = new Array<any>();
  constructor(
      private readonly projectService: ProjectService,
      private readonly SettingsService: SettingsService
  ) {

  }
  ngOnChanges(){ // 用于监控父组件传递的数据变化
    this.getData()
  }
  public ngOnInit() {
    
  }
  public getData(){
    this.getBusinessEffectivenessMonthlyReport(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.monthlyReport = response.targets.project_monthly
        }))
        .subscribe();
  }
  /**
   * 获取月报
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getBusinessEffectivenessMonthlyReport(projectCode: string, dimYear: string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_info1', ["project_weekly_monthly"])
        .pipe(map(response => response.data))
  }
  public downLoadMonthlyReport(id: string){
    window.open(`${ this.SettingsService.server.apiPrefix }/file/${ id }`)
  }
}
