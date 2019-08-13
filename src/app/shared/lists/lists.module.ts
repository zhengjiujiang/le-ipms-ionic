import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ProjectListComponent,
  ],
  declarations: [
    ProjectListComponent,
  ],
})
export class ListsModule { 
  
}
