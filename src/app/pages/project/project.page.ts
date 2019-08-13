import { IonSlides } from '@ionic/angular';
import { getDateRange } from 'src/app/shared/utils/date-range';
import { ImageService } from 'src/app/services/image.service';
import { tap, mergeMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { PickerController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ipms-project',
  styleUrls: ['./project.page.scss'],
  templateUrl: './project.page.html',
})
export class ProjectPage implements OnInit {
  public pageTitle: string;
  // 项目基本信息数据
  public basicData: any;
  // 项目健康度评测数据
  public healthData: any;


  public progress: string;
  public slideImages: [string, string];

  private _slideIndex: number = 0;
  private dates = getDateRange(12);
  private date: { year: string, month: string };
  private projectCode: string;
  public childrenData: object = { code: this.projectCode, date: this.date };

  @ViewChild('slides', { read: IonSlides })
  public slides: IonSlides;

  get slideIndex() {
    return this._slideIndex;
  }
  set slideIndex(slideIndex: number) {
    this._slideIndex = slideIndex;
    this.slides.slideTo(slideIndex);
  }

  constructor(
      private readonly imageService: ImageService,
      private readonly activatedRoute: ActivatedRoute,
      private readonly projectService: ProjectService,
      private readonly pickerController: PickerController) {

  }

  public ngOnInit() {
    this.date = this.dates[0];
    this.activatedRoute.queryParamMap
      .pipe(tap(queryParamMap => {
        this.pageTitle = queryParamMap.get('title');
        this.progress = queryParamMap.get('progress');
      }))
      .pipe(mergeMap(() => this.activatedRoute.paramMap))
      .pipe(tap(paramMap => this.projectCode = paramMap.get('projectCode')))
      .pipe(mergeMap(() => this.fetchImages(this.projectCode, this.date.year, this.date.month)))
      .pipe(tap(({ qrjytu, pymmtu }) => this.slideImages = [qrjytu.url, pymmtu.url]))
      .pipe(mergeMap(() => this.fetchBasicData(this.projectCode, this.date.year, this.date.month))) // 获取项目基本信息接口调用
      .pipe(tap(data => this.basicData = data))
     
      .subscribe();
  }
  public getData(){
    this.fetchImages(this.projectCode, this.date.year, this.date.month)
        .pipe(tap(({ qrjytu, pymmtu }) => this.slideImages = [qrjytu.url, pymmtu.url]))
        .pipe(mergeMap(() => this.fetchBasicData(this.projectCode, this.date.year, this.date.month))) // 获取项目基本信息接口调用
        .pipe(tap(data => this.basicData = data))
        .subscribe();
  }
  public onSlideDidChange(event: Promise<number>) {
    event.then(index => this.slideIndex = index);
  }

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
            this.getData()

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

  /**
   * 获取项目图片
   */
  private fetchImages(code: string, year: string, month: string) {
    return this.projectService.getTargets({ projectCode: code, dimYear: year, dimMonth: month }, 'project_single_info1', ['project_whole_pic'])
      .pipe(map(response => response.data))
      .pipe(map(data => data.targets['project_whole_pic']))
      .pipe(map(([qrjytu, pymmtu]) => ({
        qrjytu: { url: this.imageService.getImageURL(qrjytu.wholePicDbId) },
        pymmtu: { url: this.imageService.getImageURL(pymmtu.wholePicDbId) },
      })));
  }

  /**
   * 获取基本信息
   */
  private fetchBasicData(code: string, year: string, month: string) {
    return this.projectService.getTargets({ projectCode: code, dimYear: year, dimMonth: month }, 'target_pro_card', ['view_project_info'])
      .pipe(map(response => response.data))
      .pipe(map(data => data.targets['view_project_info']));
  }


}
