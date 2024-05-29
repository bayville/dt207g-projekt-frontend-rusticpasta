import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = baseApiUrl;

  constructor(private http: HttpClient) { }

  //Find existing customer using email
  findCustomer(email: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customer/find`, { email });
  }
}
  

