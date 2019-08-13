import { of } from 'rxjs';
import { Project } from 'src/app/models/public_api';
import { getDateRange } from 'src/app/shared/utils/date-range';
import { ProjectService } from 'src/app/services/project.service';
import { Component, OnInit } from '@angular/core';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { map, catchError, tap, finalize } from 'rxjs/operators';
import { ModalController, IonInfiniteScroll, IonRefresher, ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'ipms-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  private date: { year: string, month: string };
  public projects: Array<Project>;

  constructor(
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,
      private readonly projectService: ProjectService,
      private readonly modalController: ModalController,
      private readonly toastController: ToastController,
      private readonly alertController: AlertController,
      private readonly loadingController: LoadingController) {

  }

  public async ngOnInit() {
    const [{ year, month }] = getDateRange(1);
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: '正在加载',
    });
    this.date = { year, month };
    loading.present();
    this.fetchProjects(year, month)
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
      .subscribe();
  }

  public onProjectClick(project: Project) {
    this.router.navigate(['/project', project.projectCode], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: project.projectName,
        progress: project.progress
      },
    });
  }

  public async showSortAlert() {
    const alert = await this.alertController.create({
      header: '排序方式',
      inputs: [
        {
          type: 'radio',
          label: '健康度',
          value: 0,
          checked: true,
        },
        {
          type: 'radio',
          value: 1,
          label: '区域',
        },
        {
          type: 'radio',
          value: 2,
          label: '责任单位',
        },
      ],
      buttons: [
        {
          text: '确认',
          handler: (a) => {
            console.log(a);
          },
        },
      ],
    });
    alert.present();
  }

  public async openSearchModal() {
    const modal = await this.modalController.create({
      component: SearchModalComponent,
    });
    modal.present();
  }

  public async loadProjects(infiniteScroll: IonInfiniteScroll) {
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
  }

  public onProjectsReload(refresher: IonRefresher) {
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
  }

  private fetchProjects(year: string, month: string, page: number=1) {
    return this.projectService.getProjects(year, month, '', page, 10)
      .pipe(map(response => response.data));
  }

}
