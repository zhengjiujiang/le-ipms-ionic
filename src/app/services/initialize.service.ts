import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class InitializeService {

  constructor(
      private readonly http: HttpClient,
      private readonly settings: SettingsService,) {

  }

  public initialize(): Promise<any> {
    return Promise.all([
      this.loadSettings(),
    ]);
  }

  private loadSettings(): Promise<any> {
    return this.http.get<any>(`assets/config/prod.json`)
      .pipe(tap(settings => this.settings.setAppSettings(settings.app)))
      .pipe(tap(settings => this.settings.setServerSettings(settings.server)))
      .toPromise();
  }

}
