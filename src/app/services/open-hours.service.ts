import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';;
import { baseApiUrl } from '../config/config';
import { OpenHours } from '../models/open-hours';

@Injectable({
  providedIn: 'root'
})
export class OpenHoursService {
  private apiUrl = baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllDays(): Observable<OpenHours[]> {
    return this.http.get<OpenHours[]>(`${this.apiUrl}/openhours/getAll`);
  }
 

  updateDay(day: OpenHours): Observable<OpenHours> {
    return this.http.put<OpenHours>(`${this.apiUrl}/openhours/protected/${day.id}`, day);
  }



}
