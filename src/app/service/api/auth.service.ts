import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ParentApiService} from './parent.api.service';
import {text} from '@fortawesome/fontawesome-svg-core';
import {stringify} from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentApiService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.getToken().subscribe(tokenResponse => {
      this.tokenLog = tokenResponse.tokenLogin; // JSON.parse(JSON.stringify(data)).tokenLogin;
    });
  }

  get isLoggedIn(): boolean {
    return this.loggedInStatus;
  }

  private tokenLog: string;

  loggedInStatus = false;



  loggedIn(value: boolean, email: string, idProf: string, formation: object[], personne: object[], poste: string): void {
    this.loggedInStatus = value;
    if (value) {
      sessionStorage.setItem('tokenLogin', this.tokenLog);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('nom', personne['nom']);
      sessionStorage.setItem('formations', JSON.stringify(formation));
      sessionStorage.setItem('prenom', personne['prenom']);
      sessionStorage.setItem('poste', poste);
      sessionStorage.setItem('id', idProf);
      sessionStorage.setItem('idPersonne', personne['idPersonne']);
    }
  }

  loggedInAdmin(value: boolean, email: string, poste: string): void {
    this.loggedInStatus = value;
    if (value) {
      sessionStorage.setItem('tokenLogin', this.tokenLog);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('poste', poste);
    }
  }

  loggedOut(): void {
    sessionStorage.clear();
  }

  /**
   * Fonction qui appelle l'API qui permet de vérifier que l'email et le mdp sont bon
   * @param email email de la secrétaire
   * @param password mot de passe de la secrétaire
   */

  getUserDetails(email, password): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/rest/api/secretaire/correctLogin', {
      email,
      password
    });
  }
  getUserDetailsAdmin(email, password): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/rest/api/admin/correctLogin', {
      email,
      password
    });
  }

  getUserDetailsProfesseur(email, password): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/rest/api/professeur/correctLogin', {
      email,
      password
    });
  }

  /**
   * Fonction qui appelle l'API qui reset le password
   * @param email email du mot de passe a reset
   */

  public resetPassword(email): any {
    return this.httpClient.post(environment.apiUrl + '/rest/api/contact/resetPassword', {
      email
    });
  }

  /**
   * Fonction permettant de savoir si le token est correct ou non
   * @param token qui est le token unique que l'on donne à l'URL
   */
  public correctToken(token): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/rest/api/contact/correctToken?token=' + token);
  }

  public getToken(): Observable<any> {
    return this.httpClient.get<string>(environment.apiUrl + '/rest/api/contact/loginToken', {responseType: 'json'});
  }

  public changePassword(password: string, token: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/rest/api/contact/changePassword', {
      password, token
    });
  }
}
