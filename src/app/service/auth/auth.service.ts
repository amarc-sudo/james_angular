import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loggedInStatus = false;

  // tslint:disable-next-line:typedef
  get isLoggedIn(){
    return this.loggedInStatus;
  }
  // tslint:disable-next-line:typedef
  loggedIn(value: boolean, email: string){
    this.loggedInStatus = value;
    if (value) {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('email', email);
    }
  }

  // tslint:disable-next-line:typedef
  getUserDetails(email, password){
    return this.http.post(environment.apiUrl + +'/rest/api/secretaire/correctLogin', {
      email,
      password
    });
  }
}
