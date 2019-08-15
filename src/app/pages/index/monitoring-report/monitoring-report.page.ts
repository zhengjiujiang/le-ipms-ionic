import { Component, OnInit } from '@angular/core';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Project} from '../../../models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, IonInfiniteScroll, IonRefresher, ToastController, AlertController, LoadingController } from '@ionic/angular';
import {ProjectService} from '../../../services/project.service';
import {getDateRange} from '../../../shared/utils/date-range';
import { PickerController } from '@ionic/angular';
import { SettingsService } from '../../../services/settings.service';
@Component({
  selector: 'ipms-monitoring-report',
  templateUrl: './monitoring-report.page.html',
  styleUrls: ['./monitoring-report.page.scss'],
})
export class MonitoringReportPage implements OnInit {
  public Data: Object = {
    time: '2019年3月',
    allProject: 22,
    performanceProject: 10,
    eliteProject: 5,
    lawsuitProject: 17
  };
  public page: any = 1;
  public pdfSrc: any = 'https://www.thymeleaf.org/doc/tutorials/3.0/usingthymeleaf.pdf';
  public pdfSrc2: any = '';
  public selectedDate: any = '2';
  private dates = getDateRange(12);
  private date: { year: string, month: string };
  public zoom: number = 1;
  public dbClick: boolean = false;
  public projects: Array<Project>;
  constructor(
      private readonly LoadingController: LoadingController,
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,
      private readonly modalController: ModalController,
      private readonly toastController: ToastController,
      private readonly alertController: AlertController,
      private readonly loadingController: LoadingController,
      private readonly projectService: ProjectService,
      private readonly pickerController: PickerController,
      private readonly settingsService: SettingsService
  ) { }

  public async ngOnInit() {
    /*loading.present(); // 调用loading实例
    setTimeout(() => {
      loading.dismiss(); // 移除loading实例
    },1000)*/
    const [{ year, month }] = getDateRange(1);
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: '正在加载',
    });
    this.date = { year, month };
   /* this.fetchProjects(year, month)
        .pipe(finalize(() => loading.dismiss()))
        .pipe(tap(data => this.projects = data))
        .pipe(catchError(async err => {
          const toast = await this.toastController.create({
            color: 'danger',
            message: '加载失败',
            showCloseButton: true,
            closeButtonText: '关闭',
          });
          toast.present();
          return of(null);
        }))
        .subscribe();*/
    // this.getMonitoringReport(year, month)
      this.pdfSrc2 = `${this.settingsService.server.apiPrefix}/getMonthlyReportPDF?type=1&dimYear=${this.date.year}&dimMonth=${this.date.month}`;

  }
  public onDoubleTap(e){
      alert(JSON.stringify(e.type))
      // this.zoom += 0.1;
  }
  public PinchIn(){
      this.zoom -= 0.1;
  }
  public PinchOut(){
      this.zoom += 0.1;
  }
  public Dblclick(){
      this.dbClick = !this.dbClick;
      if (this.dbClick){
          this.zoom += 0.5;

      } else {
          this.zoom -= 0.5;
      }
  }
/*  public onProjectsReload(refresher: IonRefresher) {
    const { year, month } = this.date;
    this.fetchProjects(year, month)
        .pipe(finalize(() => refresher.complete()))
        .pipe(tap(data => this.projects = data))
        .pipe(catchError(async () => {
          const toast = await this.toastController.create({
            color: 'danger',
            message: '加载失败',
            showCloseButton: true,
            closeButtonText: '关闭',
          });
          toast.present();
          return of(null);
        }))
        .subscribe();
  }*/
/*  public onProjectClick(project: Project) {
    this.router.navigate(['/project', project.projectCode], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: project.projectName,
      },
    });
  }*/
/*  public async loadProjects(infiniteScroll: IonInfiniteScroll) {
    const { year, month } = this.date;
    this.fetchProjects(year, month, Math.ceil(this.projects.length / 10) + 1)
        .pipe(finalize(() => infiniteScroll.complete()))
        .pipe(tap(data => this.projects.push(...data)))
        .pipe(catchError(async () => {
          const toast = await this.toastController.create({
            color: 'danger',
            message: '加载失败',
            showCloseButton: true,
            closeButtonText: '关闭',
          });
          toast.present();
          return of(null);
        }))
        .subscribe();
  }*/
/*  private fetchProjects(year: string, month: string, page: number=1) {
    return this.projectService.getProjects(year, month, '', page, 10)
        .pipe(map(response => response.data));
  }*/

    /**
     * 获取监测项目基本信息
     * @param dimYear
     * @param dimMonth
     */
/*  public getMonitoringReport(dimYear: string, dimMonth: string){
      return this.projectService.getMonitoringReport(dimYear, dimMonth)
          .pipe(map(response => response.data))
  }*/
    public async openPicker() {
        const picker = await this.pickerController.create({
            columns: [
                {
                    name: 'date',
                    options: this.dates.map(item => ({
                        text: `${ item.year }-${ item.month }`,
                        value: item,
                    })),
                },
            ],
            buttons: [
                { text: '取消', role: 'cancel' },
                {
                    text: '确认',
                    handler: (columns) => {
                        this.date = columns.date.value;
                        this.pdfSrc2 = `${this.settingsService.server.apiPrefix}/getMonthlyReportPDF?type=2&dimYear=${this.date.year}&dimMonth=${this.date.month}`;
                    },
                },
            ],
        });
        this.dates.some((item, index) => {
            if(this.date.year === item.year && this.date.month === item.month) {
                picker.columns[0].selectedIndex = index;
                return true;
            }
            return false;
        });
        picker.present();
    }

    public getMonthlyReportPDF(year: string, month: string){
        return this.projectService.getMonthlyReportPDF(year, month)
            .pipe(map(response => response.data))
    }
}
