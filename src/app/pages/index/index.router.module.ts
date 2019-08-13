import { NgModule } from '@angular/core';
import { IndexPage } from './index.page';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'companies',
      },
      {
        path: 'companies',
        loadChildren: './companies/companies.module#CompaniesPageModule',
      },
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsPageModule',
      },
      {
        path: 'monitoring-report',
        loadChildren: './monitoring-report/monitoring-report.module#MonitoringReportPageModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class IndexPageRoutingModule {

}
