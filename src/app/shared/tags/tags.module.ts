import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectStatusTagComponent } from './project-status-tag/project-status-tag.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    ProjectStatusTagComponent,
  ],
  declarations: [
    ProjectStatusTagComponent,
  ],
})
export class TagsModule { 
  
}
