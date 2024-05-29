import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //Token
  token: string = 'token';

  public saveUser(data: any): void {
    localStorage.removeItem(this.token);
    localStorage.setItem(this.token, JSON.stringify(data));
  }

  //Gets user from localstorage
  public getUser(): User | null {
    const data = localStorage.getItem(this.token);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  //Checks if user is logged in
  public isLoggedIn(): boolean {
    const data = localStorage.getItem(this.token);
    if (data) {
      return true;
    }
    return false;
  }

}
