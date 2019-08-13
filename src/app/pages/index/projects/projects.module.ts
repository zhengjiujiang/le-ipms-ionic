import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProjectsPage } from './projects.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { SearchModalComponent } from './search-modal/search-modal.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProjectsPage,
    SearchModalComponent,
  ],
  entryComponents: [
    SearchModalComponent,
  ],
})
export class ProjectsPageModule {

}
