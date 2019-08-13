import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'ipms-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {

  constructor(
      private readonly platform: Platform,) {
    this.initializeApp();
  }

  public initializeApp() {
    this.platform.ready().then(() => {

    });
  }

}
