import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';;
import { Category } from '../models/category';
import { baseApiUrl } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = baseApiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category/protected/getAll`);
  }
 
  getAllPublishedCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category/getAllPublished`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/category/protected/${category.id}`, category);
  }

  
  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/category/protected/${category.id}`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/category/protected/`, category);
  }

}