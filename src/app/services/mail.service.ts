import { Injectable } from '@angular/core';
import { baseApiUrl } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = baseApiUrl;

  constructor(private http: HttpClient) { }


  sendContactForm(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mail/contactForm`, form);
  }
}
