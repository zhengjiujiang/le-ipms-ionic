import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
      private readonly http: HttpClient,
      private readonly settings: SettingsService) {

  }

  public getProjects(dimYear: string, dimMonth: string, projectName: string='', page: number=1, limit: number=10) {
    return this.http.post<any>(`${ this.settings.server.apiPrefix }/project/card/list/search`, {
      page: {
        page,
        limit,
      },
      filter: {
        dimYear,
        dimMonth,
        projectName,
      },
    });
  }

  public getTargets(filters: any = {}, subject: string, targetCodeList: Array<string>, pageNum?: number, pageSize?: number,) {
    return this.http.post<any>(`${ this.settings.server.apiPrefix }/project/targets`, {
      filter: { ...filters },
      pageNum: `${ pageNum ? pageNum: 0 }`,
      pageSize: `${ pageSize ? pageSize: 0 }`,
      subject: `${ subject }`,
      targetCodeList: [...targetCodeList]
    });
  }

  /**
   * 项目卡片--健康度
   * @param projectCode 项目标识code
   * @param dimYear 年份
   * @param dimMonth 月份
   * */
  public getHealth(projectCode: string, dimYear: string, dimMonth: string ){
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/project/${ projectCode }/year/${ dimYear }/month/${ dimMonth }/healthy`)
  }

  /**
   * 获取项目关键环节
   * @param projectCode 项目标识code
   * @param dimYear 年份
   * @param dimMonth 月份
   * */
  public getKeyLink(projectCode: string, dimYear: string, dimMonth: string){
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/project/key/link`,{
      params:{
        projectCode,
        dimYear,
        dimMonth
      }
    })
  }

  /**
   * 项目月度报告转pdf
   * @param dimYear 选中的年份
   * @param dimMonth 选中的月份
   * @param type 月报类型
   */
  public getMonthlyReportPDF(dimYear: string, dimMonth: string, type: string = '2'){
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/getMonthlyReportPDF`,{
      params: {
        dimYear,
        dimMonth,
        type
      }
    })
  }

  /**
   * 获取项目关键环节
   * @param projectCode
   * @param dimYear
   * @param dimMonth
   */
  public getkeyLink(projectCode: string,dimYear: string, dimMonth: string){
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/key/link`,{
      params: {
        dimYear,
        dimMonth,
        projectCode
      }
    })
  }
}
