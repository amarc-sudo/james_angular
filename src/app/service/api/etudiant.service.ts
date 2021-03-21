import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Cours} from '../../api/objects/Cours';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Etudiant} from '../../api/objects/Etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(etudiant: Etudiant): Observable<Etudiant> {
    return this.httpClient.post<Etudiant>(environment.apiUrl + '/rest/api/etudiant/create', etudiant);
  }
}
