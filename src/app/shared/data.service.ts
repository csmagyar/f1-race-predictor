import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private date: Date = new Date();
  private year: number = this.date.getFullYear();
  private apiUrl: string = `https://ergast.com/api/f1`;
  private mediaUrl: string = `https://media.formula1.com/content/dam/fom-website/2018-redesign-assets`;

  constructor(private http: HttpClient) { }

  getNextRace(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current/next.json`);
  }

  getCalendar(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.year}.json`).pipe(tap(result => {
      console.log(result);
      for (let race of result.MRData.RaceTable.Races) {
        race.Circuit.Location = this.errorCorrection(race.Circuit.Location);
        race.Circuit.Location.trackLayoutImg = `https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track icons 4x3/${ !!race.Circuit.Location.locationCorrected ? race.Circuit.Location.locationCorrected : race.Circuit.Location.country } carbon.png.transform/3col/image.png`;
        race.Circuit.Location.countryFlagImg = `${this.mediaUrl}/Flags 16x9/${ race.Circuit.Location.country }-flag.png.transform/3col/image.png`;
      }
    }));
  }

  getRaceResults(year: number, round: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${year}/${round}/results.json`).pipe(tap(result => {
      // console.log(result);
    }));
  }

  private errorCorrection(location: {country: string, lat: string, long: string, locality: string, locationCorrected?: string}) {
    switch (location.locality) {
      case "Silverstone":
        location.locationCorrected = "Great Britain";
        break;
      case "Miami":
        location.locationCorrected = "Miami";
        break;
      case "Abu Dhabi":
        location.locationCorrected = "Abu Dhabi";
        break;
      case "Las Vegas":
        location.locationCorrected = "Las Vegas";
        break;
      case "Imola":
        location.locationCorrected = "Emilia Romagna";
        break;
      default:
        break;   
    }
    return location;
  }
}
