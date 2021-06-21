import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenConnexion} from '../../api/objects/TokenConnexion';

@Injectable({
  providedIn: 'root'
})
export class TokenConnexionService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  generateToken(mail: string): Observable<TokenConnexion> {
    return this.httpClient.get<TokenConnexion>(this.api + '/rest/api/token/generateToken?mail=' + mail);
  }

  checkConnexion(mail: string, token: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.api + '/rest/api/token/checkConnexion?mail=' + mail + '&token=' + token);
  }

  generateTokenProfesseur(mail: string): Observable<TokenConnexion> {
    return this.httpClient.get<TokenConnexion>(this.api + '/rest/api/token/generateTokenProfesseur?mail=' + mail);
  }
  checkConnexionProfesseur(mail: string, token: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.api + '/rest/api/token/checkConnexionProfesseur?mail=' + mail + '&token=' + token);
  }
  generateTokenAdmin(mail: string): Observable<TokenConnexion> {
    return this.httpClient.get<TokenConnexion>(this.api + '/rest/api/token/generateTokenAdmin?mail=' + mail);
  }
  checkConnexionAdmin(mail: string, token: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.api + '/rest/api/token/checkConnexionAdmin?mail=' + mail + '&token=' + token);
  }
}
