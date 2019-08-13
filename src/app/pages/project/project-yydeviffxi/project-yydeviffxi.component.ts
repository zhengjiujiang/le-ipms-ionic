import { EChartOption } from 'echarts';
import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../../services/project.service';
import {map} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
@Component({
  selector: 'ipms-project-yydeviffxi',
  styleUrls: ['./project-yydeviffxi.component.scss'],
  templateUrl: './project-yydeviffxi.component.html',
})
export class ProjectYydeviffxiComponent implements OnInit {
  @Input()
  public code: any;
  @Input()
  public date: any;
  public data: any;
  public EchartsData: Array<any> = new Array<any>();
  public chartsOption: EChartOption = {};
  public list: Array<any> = new Array<any>();
  constructor(
      private readonly projectService: ProjectService,
  ) {

  }

  public ngOnInit() {

    // this.list = this.filterDataList(this.data.data)
    this.getData()
  }
   ngOnChanges(){
    this.getData()
  }
  public getData(){
    this.getKeyLink(this.code, this.date.year,this.date.month)
    .pipe(tap(response => {
      this.data = response.targets;
      this.EchartsData = this.dataChangeArraies(this.data);
      this.chartsOption = this.mapToChartOptions();
    }))
    .subscribe()
  }
  public dataChangeArraies(item: object){
    let XaxisArr = [];
    let YaxisArrOne = [];
    let YaxisArrTwo = [];
    let YaxisArrThr = [];
    let ArrayAll = [];
    for (let i in item){
      if (i === 'analysis'){
      } else {
        XaxisArr.unshift(`${ item[i].year }-${ item[i].month }`);
        YaxisArrOne.unshift(`${ item[i].completedActualCost }`);
        YaxisArrTwo.unshift(`${ item[i].completedBudget }`);
        YaxisArrThr.unshift(`${ item[i].planBudget }`);
      }
    }
    ArrayAll.push(XaxisArr,YaxisArrOne,YaxisArrTwo,YaxisArrThr);
    return ArrayAll;
  }
  private mapToChartOptions(): EChartOption {
    return {
      grid: {
        top: 30,
        left: 0,
        right: 10,
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        // data: new Array(5).fill(0).map((_, index) => `$${ index }`),
        data: this.EchartsData[0],
        splitLine: {
          show: true,
        },
        boundaryGap: false,
        interval: 12,
      },
      yAxis: {
        name: '万元',
        type: 'value',
        splitLine: {
          show: true,
        },
      },
      series: [
        {
          type: 'line',
          name: '已完工作预算费用',
          // data: new Array(12).fill(0).map(() => ({ value: Number.parseFloat((Math.random() * 100).toFixed(2)), unit: '万元' })),
          data: this.EchartsData[1],
          smooth: true,
        },
        {
          type: 'line',
          name: '计划工作预算费用',
          // data: new Array(12).fill(0).map(() => ({ value: Number.parseFloat((Math.random() * 100).toFixed(2)), unit: '万元' })),
          data: this.EchartsData[3],
          smooth: true,
        },
        {
          type: 'line',
          name: '已完工作实际费用',
          // data: new Array(12).fill(0).map(() => ({ value: Number.parseFloat((Math.random() * 100).toFixed(2)), unit: '万元' })),
          data: this.EchartsData[2],
          smooth: true,
        },
      ],
      legend: {
        data: ['已完工作预算费用', '计划工作预算费用', '已完工作实际费用'],
        bottom: 0,
      },
    };
  }
  /**
   * 获取项目关键环节
   * */
  private getKeyLink(projectCode: string, dimYear:string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_earned_value_analysis', ["trend_man_all","analysis"])
        .pipe(map(response => response.data))
    // .pipe(map(data => data.targets['view_project_info']));
  }
}
