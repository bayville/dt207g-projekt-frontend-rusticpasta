import { HttpClient } from '@angular/common/http';
import { baseApiUrl } from '../config/config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status } from '../models/status';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = baseApiUrl;


  constructor(private http: HttpClient) { }

  newOrder(body: {}): Observable<any> {
    console.log("I newOrder: ", body);
    return this.http.post<any>(`${this.apiUrl}/order/`, body);
  }

  getOrderStatus(id: {}): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order/getOrderStatus/${id}`);
  }

  getOneOrder(id: {}): Observable<Order> {
    console.log("getOneOrder: ", id);
    return this.http.get<Order>(`${this.apiUrl}/order/id=${id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order/protected/getAll`);
  }

  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}/order/statuses/`);
  }

  updateOrderStatus(status: any): Observable<Status> {
    console.log(status.id);
    return this.http.put<Status>(`${this.apiUrl}/order/protected/status/${status.id}`, status);
  }

}