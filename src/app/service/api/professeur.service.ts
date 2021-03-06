import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Professeur} from '../../api/objects/Professeur';
import {Secretaire} from '../../api/objects/Secretaire';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  list(): Observable<Professeur[]> {
    return this.httpClient.get<Professeur[]>(this.api + '/rest/api/professeur/list');
  }

  listByFormation(idFormation: number): Observable<Professeur[]> {
    return this.httpClient.get<Professeur[]>(this.api + '/rest/api/professeur/listByFormation?idFormation=' + idFormation);
  }

  update(professeur: Professeur): Observable<Professeur> {
    return this.httpClient.post<Professeur>(this.api + '/rest/api/professeur/update', professeur);
  }

  updateList(listProfesseur: Professeur[]): Observable<Professeur[]> {
    return this.httpClient.patch<Professeur[]>(this.api + '/rest/api/professeur/updateList', listProfesseur);
  }

  create(professeur: Professeur): Observable<Professeur> {
    return this.httpClient.post<Professeur>(environment.apiUrl + '/rest/api/professeur/create', professeur);
  }

  read(idProf: number): Observable<Professeur>{
    return this.httpClient.get<Professeur>(environment.apiUrl + '/rest/api/professeur/read?id=' + idProf);
  }
}
