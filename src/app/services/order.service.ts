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

  //Creates new order
  newOrder(body: {}): Observable<any> {
    console.log("I newOrder: ", body);
    return this.http.post<any>(`${this.apiUrl}/order/`, body);
  }

  //Gets order status
  getOrderStatus(id: {}): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/order/getOrderStatus/${id}`);
  }

  //Gets one oreder
  getOneOrder(id: {}): Observable<Order> {
    console.log("getOneOrder: ", id);
    return this.http.get<Order>(`${this.apiUrl}/order/id=${id}`);
  }

  //Get all orders (Protected)
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/order/protected/getAll`);
  }

  //Get all statuses
  getAllStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.apiUrl}/order/statuses/`);
  }

  //Update order status (Protected)
  updateOrderStatus(status: any): Observable<Status> {
    console.log(status.id);
    return this.http.put<Status>(`${this.apiUrl}/order/protected/status/${status.id}`, status);
  }

}