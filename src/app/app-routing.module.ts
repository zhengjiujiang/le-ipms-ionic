import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'index',
  },
  {
    path: 'index',
    loadChildren: './pages/index/index.module#IndexPageModule',
  },
  {
    path: 'company/:companyCode',
    loadChildren: './pages/company/company.module#CompanyPageModule',
  },
  {
    path: 'project/:projectCode',
    loadChildren: './pages/project/project.module#ProjectPageModule',
  },
  {
    path: 'project-search',
    loadChildren: './pages/project-search/project-search.module#ProjectSearchPageModule',
  },
  { path: 'showpdf', loadChildren: './pages/index/showpdf/showpdf.module#ShowpdfPageModule' },
  { path: 'showpdf', loadChildren: './showpdf/showpdf.module#ShowpdfPageModule' },
  { path: 'showpdf', loadChildren: './pages/showpdf/showpdf.module#ShowpdfPageModule' },
  { path: 'showpdf', loadChildren: './pages/index/showpdf/showpdf.module#ShowpdfPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {

}
