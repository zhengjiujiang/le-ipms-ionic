import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChrisProgressBarComponent } from './chris-progress-bar/chris-progress-bar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ChrisProgressBarComponent,
  ],
  declarations: [
    ChrisProgressBarComponent,
  ],
})
export class ProgressBarsModule { 

}
