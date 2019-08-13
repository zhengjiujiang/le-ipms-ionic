import { NgModule } from '@angular/core';
import { TagsModule } from './tags/tags.module';
import { CardsModule } from './cards/cards.module';
import { ListsModule } from './lists/lists.module';
import { CommonModule } from '@angular/common';
import { RadioButtonsModule } from './radio-buttons/radio-buttons.module';
import { ProgressBarsModule } from './progress-bars/progress-bars.module';

@NgModule({
  imports: [
    TagsModule,
    CardsModule,
    ListsModule,
    CommonModule,
    RadioButtonsModule,
    ProgressBarsModule,
  ],
  exports: [
    TagsModule,
    CardsModule,
    ListsModule,
    CommonModule,
    RadioButtonsModule,
    ProgressBarsModule,
  ],
})
export class SharedModule { 

}
