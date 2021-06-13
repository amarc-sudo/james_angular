import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Cours} from '../../api/objects/Cours';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Etudiant} from '../../api/objects/Etudiant';
import {Formation} from '../../api/objects/Formation';

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

  read(id: number): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>(environment.apiUrl + '/rest/api/etudiant/read?id=' + id);
  }

  listByFormation(formation: Formation[]): Observable<Etudiant[]> {
    return this.httpClient.post<Etudiant[]>(environment.apiUrl + '/rest/api/etudiant/listByFormation', formation);
  }

  update(etudiant: Etudiant): Observable<Etudiant> {
    return this.httpClient.post<Etudiant>(environment.apiUrl + '/rest/api/etudiant/update', etudiant);
  }

  delete(idEtudiant: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiUrl + '/rest/api/etudiant/delete?id=' + idEtudiant);
  }
}
