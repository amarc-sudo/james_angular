import {Injectable} from '@angular/core';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Cours} from '../../api/objects/Cours';

@Injectable({
  providedIn: 'root'
})
export class CoursService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(cours: Cours): Observable<Cours>{
    return this.httpClient.post<Cours>(environment.apiUrl + '/rest/api/cours/create', cours);
  }

  read(idCours: number): Observable<Cours> {
    return this.httpClient.get<Cours>(environment.apiUrl + '/rest/api/cours/read?idCours=' + idCours);
  }

  readFichePresence(idFormation: number, date: string): Observable<any> {
    return this.httpClient.get<any>(environment.apiUrl + '/rest/api/cours/getFichePresence?idFormation=' + idFormation + '&dateCours=' + date, {responseType: 'blob' as 'json'});
  }

  listByFormationAndDate(idFormation: number, date: string): Observable<Cours[]> {
    return this.httpClient.get<Cours[]>(environment.apiUrl + '/rest/api/cours/' + idFormation + '/listCoursByDate?date=' + date);
  }

  update(cours: Cours): Observable<void> {
    return this.httpClient.patch<void>(environment.apiUrl + '/rest/api/cours/update', cours);
  }
}
