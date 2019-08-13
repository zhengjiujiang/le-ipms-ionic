import { NgModule } from '@angular/core';
import { IndexPage } from './index.page';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexPageRoutingModule } from './index.router.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule,
    IndexPageRoutingModule,
  ],
  declarations: [
    IndexPage,
  ],
})
export class IndexPageModule {
  
}
