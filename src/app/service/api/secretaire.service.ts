import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentApiService} from './parent.api.service';
import {Observable} from 'rxjs';
import {Professeur} from '../../api/objects/Professeur';
import {Secretaire} from '../../api/objects/Secretaire';
import {Etudiant} from '../../api/objects/Etudiant';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecretaireService extends ParentApiService {


  constructor(private httpClient: HttpClient) {
    super();
  }


  read(idSecretaire: number): Observable<Secretaire> {
    return this.httpClient.get<Secretaire>(this.api + '/rest/api/secretaire/read?idSecretaire=' + idSecretaire);
  }

  update(secretaire: Secretaire): Observable<Secretaire> {
    return this.httpClient.patch<Secretaire>(this.api + '/rest/api/secretaire/update', secretaire);
  }
  create(secretaire: Secretaire): Observable<Secretaire> {
    return this.httpClient.post<Secretaire>(environment.apiUrl + '/rest/api/secretaire/create', secretaire);
  }

}
