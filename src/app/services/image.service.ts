import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
      private readonly http: HttpClient,
      private readonly settings: SettingsService) {

  }

  public getImageURL(id: string) {
    return `${ this.settings.server.apiPrefix }/pic?picId=${ id }`;
  }

  public getImageObjectURL(id: string) {
    return this.http.get(this.getImageURL(id), { responseType: 'blob' })
      .pipe(tap((blob) => URL.createObjectURL(blob)));
  }

}
