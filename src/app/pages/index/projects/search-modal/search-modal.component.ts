import { Project } from 'src/app/models/project';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, IonSearchbar } from '@ionic/angular';
import { Component, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ProjectService } from '../../../../services/project.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'ipms-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss'],
})
export class SearchModalComponent implements OnInit, AfterViewInit {

  @ViewChild('searchbar', { read: IonSearchbar })
  public searchbar: IonSearchbar;
  public searchContent: string = '';
  public dataList: Array<any> = new Array<any>();
  constructor(
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,
      private readonly projectService: ProjectService,
      private readonly modalController: ModalController) {

  }

  public ngOnInit() {

  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.searchbar.setFocus();
    }, 300);
  }

  // !not working
  @HostListener('document:ionBackButton')
  public async overrideHardwareBackAction() {
    await this.modalController.dismiss();
  }

  public onCancel() {
    this.modalController.dismiss();
  }

  public async onProjectClick(project: Project) {
    await this.modalController.dismiss();
    this.router.navigate(['./project', project.projectCode], {
      relativeTo: this.activatedRoute,
      queryParams: {
        title: project.projectName,
      },
    });
  }
  public searchChange(event){
    if (event && event.keyCode == 13) {
      this.getData();
    }

  }
  public getData(){
    this.projectService.getProjects('2019', '06', this.searchContent)
        .pipe(map(response => response.data))
        .pipe(tap(response => this.dataList = response))
        .subscribe()
  }
}
