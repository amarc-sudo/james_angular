import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentApiService} from './parent.api.service';
import {Observable} from 'rxjs';
import {Matiere} from '../../api/objects/Matiere';

@Injectable({
  providedIn: 'root'
})
export class MatiereService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  listByFormation(idFormation: number): Observable<Matiere[]> {
    return this.httpClient.get<Matiere[]>(this.api + '/rest/api/matiere/listByFormation?idFormation=' + idFormation);
  }
}
