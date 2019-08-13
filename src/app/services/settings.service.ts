import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public app: AppSettings;
  public server: ServerSettings;

  constructor() {

  }

  public setAppSettings(settings: AppSettings) {
    this.app = settings;
  }

  public setServerSettings(settings: ServerSettings) {
    this.server = settings;
  }

}

export interface AppSettings {

}

export interface ServerSettings {
  apiPrefix: string;

}
