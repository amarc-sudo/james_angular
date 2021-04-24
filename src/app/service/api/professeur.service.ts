import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Professeur} from '../../api/objects/Professeur';

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
}
