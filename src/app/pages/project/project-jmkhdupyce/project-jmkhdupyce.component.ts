import { Component, OnInit, Input } from '@angular/core';
import { PROJECT_LEVEL_COLORS } from '../../../shared/constants/project-level';
import { ProjectService } from '../../../services/project.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'ipms-project-jmkhdupyce',
  templateUrl: './project-jmkhdupyce.component.html',
  styleUrls: ['./project-jmkhdupyce.component.scss'],
})
export class ProjectJmkhdupyceComponent implements OnInit {

  @Input()
  public code: string;
  @Input()
  public date: any;
  public projectLevelColors = PROJECT_LEVEL_COLORS;
  public data: any;
  constructor(
      private readonly projectService: ProjectService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.getHealth(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.data = response;
          this.data.projectHealthTargets.map((val, index) => {
            index === 2 ? val['points'] = [60, 150] : null; // 里程碑偏差天数
            index === 2 ? val['maxValue'] = 150 : null; // 里程碑偏差天数
            index === 2 ? val['minValue'] = 0 : null; // 里程碑偏差天数

            index === 3 ? val['points'] = [70, 85] : null; // 工作按期完成率
            index === 3 ? val['maxValue'] = 100 : null; // 工作按期完成率
            index === 3 ? val['minValue'] = 70 : null; // 工作按期完成率

            index === 0 ? val['points'] = [0.75, 0.9, 1.1, 1.25] : null; // 进度绩效指数spi
            index === 0 ? val['maxValue'] = 1.25 : null; // 进度绩效指数spi
            index === 0 ? val['minValue'] = 0.75 : null; // 进度绩效指数spi

            index === 1 ? val['points'] = [0.9, 0.97] : null; // 费用绩效指数CPI
            index === 1 ? val['maxValue'] = 2 : null; // 费用绩效指数CPI
            index === 1 ? val['minValue'] = 0.9 : null; // 费用绩效指数CPI

            index === 4 ? val['points'] = [70, 85] : null; // 资金到位率
            index === 4 ? val['maxValue'] = 100 : null;// 资金到位率
            index === 4 ? val['minValue'] = 70 : null;// 资金到位率

            // index === 5 ? val['points'] = [-2, -1] : null;
            index === 5 ? val['maxValue'] = 100 : null; // 利润率
            index === 5 ? val['minValue'] = -2 : null;// 利润率

            index === 6 ? val['points'] = [80, 90] : null; //安全问题闭环率
            index === 6 ? val['maxValue'] = 100 : null; //安全问题闭环率
            index === 6 ? val['minValue'] = 80 : null; //安全问题闭环率

            index === 7 ? val['points'] = [60, 80] : null; //质量问题闭环率
            index === 7 ? val['maxValue'] = 100 : null; //质量问题闭环率
            index === 7 ? val['minValue'] = 60 : null; //质量问题闭环率

          })
        }))
        .subscribe()
  }
 /**
   * 获取项目健康度评测
   * */
  private getHealth(code: string, year: string, month: string){
    return this.projectService.getHealth(code, year, month)
        .pipe(map(response => response.data))
  }
}
