import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CompanyPage } from './company.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import {PdfViewerModule} from 'ng2-pdf-viewer';
const routes: Routes = [
  {
    path: '',
    component: CompanyPage,
  },
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule,
    PdfViewerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CompanyPage,
  ],
})
export class CompanyPageModule {
  
}
