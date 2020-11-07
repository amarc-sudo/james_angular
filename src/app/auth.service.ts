import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }



  // tslint:disable-next-line:typedef
  getUserDetails(email, password){
    return this.http.post('http://localhost:8080/rest/api/secretaire/correctLogin', {
      email,
      password
    });
  }
}
