import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
      private readonly http: HttpClient,
      private readonly settings: SettingsService) {

  }

  public getCompanies(dimYear: string, dimMonth: string) {
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/mobile/home/page/year/${ dimYear }/month/${ dimMonth }`);
  }

  public getA(dimYear: string, dimMonth: string, orgCode: string) {
    return this.http.get<any>(`${ this.settings.server.apiPrefix }/mobile/org/target/board/year/${ dimYear }/month/${ dimMonth }/org/${ orgCode }`);
  }

}
