import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Professeur} from './objects/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  listByFormation(idFormation: number): Observable<Professeur[]> {
    return this.httpClient.get<Professeur[]>(this.api + '/rest/api/professeur/list?idFormation=' + idFormation);
  }
}
