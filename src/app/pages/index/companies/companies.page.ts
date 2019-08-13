import { tap, map, finalize, catchError, merge } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, IonRefresher, ToastController } from '@ionic/angular';
import { getDateRange } from 'src/app/shared/utils/date-range';
import { PROJECT_LEVEL_COLORS } from 'src/app/shared/constants/project-level';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { of, throwError } from 'rxjs';

@Component({
  selector: 'ipms-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})
export class CompaniesPage implements OnInit {
  public static readonly DATA_TOKEN = `COMPANIES_DATA_TOKEN`;
  private date: { year: string, month: string };
  public companies: Array<any>;
  public projectLevelColors = PROJECT_LEVEL_COLORS;

  constructor(
      private readonly router: Router,
      private readonly companyService: CompanyService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly toastController: ToastController,
      private readonly loadingController: LoadingController,
      private readonly localStorageService: LocalStorageService,) {

  }

  public async ngOnInit() {
    let [{ year, month }] = getDateRange(1);
    this.date = { year, month };
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: '正在加载',
    });
    loading.present();
    this.fetchCompanies(year, month)
      .pipe(finalize(() => loading.dismiss()))
      .pipe(tap(data => this.companies = data))
      .pipe(catchError(async err => {
        console.error(err);
        const toast = await this.toastController.create({
          color: 'danger',
          message: '加载失败!',
          showCloseButton: true,
        });
        toast.present();
        return of(null);
      }))
      .subscribe();
  }

  public onCompaniesReload(refresher: IonRefresher) {
    let { year, month } = this.date;
    this.fetchCompanies(year, month, true)
      .pipe(finalize(() => refresher.complete()))
      .pipe(tap(data => this.companies = data))
      .pipe(catchError(async err => {
        console.error(err);
        const toast = await this.toastController.create({
          color: 'danger',
          message: '加载失败!',
          showCloseButton: true,
        });
        toast.present();
        return of(null);
      }))
      .subscribe();
  }

  public onCompanyClick(company: any) {
    this.router.navigate([`/company`, company.orgCode], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: company.orgName,
      },
    });
  }

  private fetchCompanies(year: string, month: string, force: boolean = false) {
    const companies = this.localStorageService.getItem<Array<any>>(CompaniesPage.DATA_TOKEN);
    if(!force && companies) {
      return of(companies);
    } else {
      return this.companyService.getCompanies(year, month)
        .pipe(map(response => response.data))
        .pipe(tap(data => this.localStorageService.setItem(CompaniesPage.DATA_TOKEN, data)));
    }
  }

}
