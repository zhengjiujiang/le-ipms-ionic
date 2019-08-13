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
            index === 3 ? val['points'] = [70, 85] : null;
            index === 0 ? val['points'] = [0.75, 0.9, 1.1, 1.25] : null; // 进度绩效质数spi
            index === 1 ? val['points'] = [0.9, 0.97] : null;
            index === 4 ? val['points'] = [70, 85] : null;
            index === 5 ? val['points'] = [-2, -1] : null;
            index === 6 ? val['points'] = [80, 90] : null;
            index === 7 ? val['points'] = [60, 80] : null;
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
