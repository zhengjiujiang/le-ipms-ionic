import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProjectPage } from './project.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { Routes, RouterModule } from '@angular/router';
import { ProjectYtbkComponent } from './project-ytbk/project-ytbk.component';
import { ProjectJibfxnxiComponent } from './project-jibfxnxi/project-jibfxnxi.component';
import { ProjectJnduvdtlComponent } from './project-jnduvdtl/project-jnduvdtl.component';
import { ProjectJyyyigxcComponent } from './project-jyyyigxc/project-jyyyigxc.component';
import { ProgressWrapperComponent } from './project-jmkhdupyce/progress-wrapper/progress-wrapper.component';
import { ProjectJmkhdupyceComponent } from './project-jmkhdupyce/project-jmkhdupyce.component';
import { ProjectYydeviffxiComponent } from './project-yydeviffxi/project-yydeviffxi.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectPage
  }
];

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule,
    NgxEchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProjectPage,
    ProjectYtbkComponent,
    ProjectJnduvdtlComponent,
    ProjectJibfxnxiComponent,
    ProjectJyyyigxcComponent,
    ProgressWrapperComponent,
    ProjectJmkhdupyceComponent,
    ProjectYydeviffxiComponent,
  ],
})
export class ProjectPageModule {
  
}
