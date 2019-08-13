import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { MonitoringReportPage } from './monitoring-report.page';

const routes: Routes = [
  {
    path: '',
    component: MonitoringReportPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PdfViewerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonitoringReportPage]
})
export class MonitoringReportPageModule {}
