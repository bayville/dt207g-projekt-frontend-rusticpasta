import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item';
import { baseApiUrl } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllPublishedMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menuItem/getAllPublished`);
  }
  getAllMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menuItem/protected/getAll`);
  }

  updateMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(`${this.apiUrl}/menuItem/protected/${menuItem.id}`, menuItem);
  }

  deleteMenuItem(menuItem: MenuItem): Observable<MenuItem>{
    console.log(menuItem);
    return this.http.delete<MenuItem>(`${this.apiUrl}/menuItem/protected/${menuItem.id}`);
  }
  
  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.apiUrl}/menuItem/protected/`, menuItem);
  }

}
