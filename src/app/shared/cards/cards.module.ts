import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ProjectInfoCardComponent } from './project-info-card/project-info-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports: [
    ProjectInfoCardComponent,
  ],
  declarations: [
    ProjectInfoCardComponent,
  ],
})
export class CardsModule { 

}
