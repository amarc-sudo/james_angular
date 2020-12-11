import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

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
  loggedIn(value: boolean, email: string, idProf: string, formation: object[],  personne: object[], poste: string){
    this.loggedInStatus = value;
    if (value) {

      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('nom', personne['nom']);
      sessionStorage.setItem('formations', JSON.stringify(formation));
      sessionStorage.setItem('prenom', personne['prenom']);
      sessionStorage.setItem('poste', poste);
      sessionStorage.setItem('id', idProf);
    }
  }

  // tslint:disable-next-line:typedef
  loggedOut(){
    sessionStorage.clear();
  }

  /**
   * Fonction qui appelle l'API qui permet de vérifier que l'email et le mdp sont bon
   * @param email email de la secrétaire
   * @param password mot de passe de la secrétaire
   */

  getUserDetails(email, password): Observable<any>{
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

  /**
   * Fonction permettant de savoir si le token est correct ou non
   * @param token qyi est le token unique que l'on donne à l'URL
   */
  public correctToken(token): Observable<boolean>{
    // @ts-ignore
    return this.http.get(environment.apiUrl + '/rest/api/contact/correctToken?token=' + token);
  }

  // @ts-ignore
  public changePassword(password: string, token: string): Observable<any>{
    return this.http.post(environment.apiUrl + '/rest/api/contact/changePassword', {
      password, token
    });
  }
}
