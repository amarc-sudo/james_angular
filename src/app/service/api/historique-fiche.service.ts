import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ParentApiService} from './parent.api.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueFicheService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  readFichePresence(idFormation: number, date: string): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/rest/api/historique-fiche/getFichePresence?idFormation=' + idFormation + '&dateCours=' + date, {responseType: 'blob' as 'json'});
  }
}
