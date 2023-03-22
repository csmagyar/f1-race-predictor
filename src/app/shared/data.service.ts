import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private date: Date = new Date();
  private year: number = this.date.getFullYear();
  private categoryName: string = "f1";
  private apiUrl: string = `https://ergast.com/api/${this.categoryName}`;

  constructor(private http: HttpClient) { }

  getNextRace(): Observable<any> {
    return this.http.get(`${this.apiUrl}/current/next.json`);
  }

  getCalendar(): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.year}.json`);
  }
}
