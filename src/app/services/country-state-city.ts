import { Injectable } from '@angular/core';
import * as countrycitystatejson from 'countrycitystatejson';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private countryData = countrycitystatejson;

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShortName: string) {
    return this.countryData.getStatesByShort(countryShortName);
  }


}
