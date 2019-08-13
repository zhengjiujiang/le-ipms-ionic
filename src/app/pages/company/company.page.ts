import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, mergeMap, finalize, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { Project } from 'src/app/models/public_api';
import { CompanyService } from 'src/app/services/company.service';
import { getDateRange } from 'src/app/shared/utils/date-range';

@Component({
  selector: 'ipms-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  public pageTitle: string;
  public origin: any;
  private date: { year: string, month: string };
  private companyCode: string;

  public projects = new Array(10).fill(0).map((_, index) => {
    return {
      name: `华电句容二期项目-${ index + 1 }`,
      company: '上海电建',
    };
  });

  constructor(
      private readonly router: Router,
      private readonly companyService: CompanyService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly loadingController: LoadingController,) {

  }

  public async ngOnInit() {
    const loading = await this.loadingController.create({ message: '正在加载', spinner: 'dots' });
    const [{ year, month }] = getDateRange(1);
    loading.present();
    this.date = { year, month };
    this.activatedRoute.queryParamMap
      .pipe(tap(queryParamMap => this.pageTitle = queryParamMap.get('title')))
      .pipe(mergeMap(() => this.activatedRoute.paramMap))
      .pipe(tap(paramMap => this.companyCode = paramMap.get('companyCode')))
      .pipe(mergeMap(() => {
        return this.fetchData(year, month, this.companyCode)
          .pipe(finalize(() => loading.dismiss()));
      }))
      .pipe(tap(data => {
        this.origin = data;
      }))
      .subscribe();
  }

  public onProjectClick(project: Project) {
    this.router.navigate([`/project`, project.projectCode], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: project.projectName,
        progress: project.progress
      },
    });
  }

  public getAnalysisConclusion() {
    if(!this.origin) {
      return '';
    }
    const box = new Array();
    const maxValue = Math.max(this.origin.abnormalProcess, this.origin.abnormalOperate, this.origin.abnormalHSE, this.origin.abnormalQuality);
    if(maxValue === 0) {
      return `目前没有异常指标`;
    }
    this.origin.abnormalProcess === maxValue &&  box.push('进度');
    this.origin.abnormalOperate === maxValue &&  box.push('经营');
    this.origin.abnormalHSE === maxValue &&  box.push('安全');
    this.origin.abnormalQuality === maxValue &&  box.push('质量');
    return `应加强项目${ box.join('、') }管理`;
  }

  private fetchData(year: string, month: string, companyCode: string) {
    return this.companyService.getA(year, month, companyCode)
      .pipe(map(response => response.data));
  }

}
