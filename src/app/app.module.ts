import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InitializeService } from './services/initialize.service';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgModule, DoBootstrap, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({
      // mode: 'ios',
    }), 
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: APP_INITIALIZER, useFactory: AppModule.appInitialize, deps: [ InitializeService ], multi: true },
  ],
  declarations: [
    AppComponent,
  ],
  entryComponents: [
    AppComponent,
  ],
})
export class AppModule implements DoBootstrap {

  static appInitialize(initializeService: InitializeService) {
    return () => initializeService.initialize();
  }

  public ngDoBootstrap(applicationRef: ApplicationRef) {
    applicationRef.bootstrap(AppComponent);
  }

}
