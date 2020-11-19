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

  /**
   * Fonction qui appelle l'API qui permet de vérifier que l'email et le mdp sont bon
   * @param email email de la secrétaire
   * @param password mot de passe de la secrétaire
   */
  // tslint:disable-next-line:typedef
  getUserDetails(email, password){
    return this.http.post(environment.apiUrl + '/rest/api/secretaire/correctLogin', {
      email,
      password
    });
  }

  /**
   * Fonction qui appelle l'API qui reset le password
   * @param email email du mot de passe a reset
   */
  // tslint:disable-next-line:typedef
  public resetPassword(email){
    return this.http.post(environment.apiUrl + '/rest/api/contact/resetPassword', {
      email
    });
  }
}
