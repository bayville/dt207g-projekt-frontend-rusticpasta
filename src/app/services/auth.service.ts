import { Injectable } from '@angular/core';
import { baseApiUrl } from '../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${baseApiUrl}/user`

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this._http.post(
      this.apiUrl + '/login',
      {
        username,
        password,
      },
      this.httpOptions
    );
  }
}
