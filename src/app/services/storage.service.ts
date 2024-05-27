import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  token = 'token';

  clear(): void {
    localStorage.clear();
  }

  public saveUser(data: any): void {
    localStorage.removeItem(this.token);
    localStorage.setItem(this.token, JSON.stringify(data));
  }

  public getUser(): any {
    const data = localStorage.getItem(this.token);
    if (data) {
      return JSON.parse(data);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const data = localStorage.getItem(this.token);
    if (data) {
      return true;
    }

    return false;
  }

}
