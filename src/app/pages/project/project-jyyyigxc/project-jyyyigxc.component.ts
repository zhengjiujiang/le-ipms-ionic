import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { EChartOption } from 'echarts';
import {map, tap} from 'rxjs/operators';
import { ProjectService } from '../../../services/project.service';
@Component({
  selector: 'ipms-project-jyyyigxc',
  templateUrl: './project-jyyyigxc.component.html',
  styleUrls: ['./project-jyyyigxc.component.scss'],
})
export class ProjectJyyyigxcComponent implements OnInit {

  @Input()
  public code: any;
  @Input()
  public date: any;

  public dataList: Array<any> = new Array<any>();
  public chartsOptions: Array<EChartOption> = [];
  public dataLine: Array<any> = new Array<any>();
  public monthlyReport: Array<any> = new Array<any>();
  constructor(
      private readonly projectService: ProjectService,
  ) {

  }
  ngOnChanges(){ // 用于监控父组件传递的数据变化
    this.getData()
  }
  public ngOnInit() {
    // this.dataList = this.filterList(this.data.data);
  }
  public getData(){
    this.getBusinessEffectiveness(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.dataList = response.targets.basics_manage_target;
        }))
        .subscribe();
    this.getBusinessEffectivenessPie(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          const data = response.targets.manage_target_analysis;

          this.getPieData(0, Number(data[0].cumulativePrrocedValues));
          this.getPieData(1, Number(data[0].cumulativeReveivedProportion));
          this.getPieData(2, Number(data[0].capitalInPlaceRate));
        }))
        .subscribe();
    this.getBusinessEffectivenessLine(this.code, this.date.year, this.date.month)
        .pipe(tap(response => {
          this.dataLine = this.getLineData(response.targets.income_expenditure_compared);
          this.chartsOptions[3] = {
            grid: {
              top: 40,
              left: 0,
              right: 10,
              bottom: 30,
              containLabel: true,
            },
            xAxis: {
              type: 'category',
              // data: new Array(5).fill(0).map((_, index) => `$${ index }`),
              data: this.dataLine[0],
            },
            yAxis: {
              name: '万元',
              type: 'value',
            },
            series: [
              {
                type: 'bar',
                name: '实际成本',
                // data:  new Array(5).fill(0).map(() => ({ value: Number.parseFloat((Math.random() * 100).toFixed(2)), unit: '万元' })),
                data:  this.dataLine[2],
                barMaxWidth: 42,
              },
              {
                type: 'bar',
                name: '营业收入',
                // data:  new Array(5).fill(0).map(() => ({ value: Number.parseFloat((Math.random() * 100).toFixed(2)), unit: '万元' })),
                data:  this.dataLine[1],
                barMaxWidth: 42,
              },
            ],
            legend: {
              data: ['实际成本', '营业收入'],
              bottom: 0,
            },
          };
        }))
        .subscribe();
  }
  public getPieData(num: number, item: number){
    this.chartsOptions[num] = {
      series: [
        {
          type: 'pie',
          data: [
            {
              value: item,
              label: {
                position: 'center',
                formatter: `${ item }%`,
              },
              itemStyle: {
                color: '#1a7eff',
              },
            },
            {
              value: 100 - item,
              itemStyle: {
                color: '#f5f5f5',
              },
            },
          ],
          silent: true,
          radius: ['70%', '95%'],
          labelLine: {
            show: false,
          },
        }
      ]
    };
  }
  public getLineData(item: Array<any>){
    let month = [];
    let completedActualCost = [];
    let operatingIncome = [];
    let all = [];
    item.map(val => {
      month.push(`${val.month}月`)
      operatingIncome.push(val.operatingIncome)
      completedActualCost.push(val.completedActualCost)
    })
    all.push(month,operatingIncome,completedActualCost);
    return all;
  }
  public filterList(item) {
    let one = [];
    let two = [];
    let all = [];
    item.map((val, i) => {
      if (i <= 2) {
        one.push(val)
      } else {
        two.push(val)
      }
    });
    all.push(one, two);
    return all;
  }
  /**
   * 获取项目经营成效
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getBusinessEffectiveness(projectCode: string, dimYear: string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_marketing', ["basics_manage_target"])
        .pipe(map(response => response.data))
  }

  /**
   * 获取饼状图数据
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getBusinessEffectivenessPie(projectCode: string, dimYear: string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_marketing', ["manage_target_analysis"])
        .pipe(map(response => response.data))
  }

  /**
   * 获取柱状图数据
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  private getBusinessEffectivenessLine(projectCode: string, dimYear: string, dimMonth: string){
    return this.projectService.getTargets({ projectCode, dimYear, dimMonth }, 'project_single_marketing', ["income_expenditure_compared"])
        .pipe(map(response => response.data))
  }


}
