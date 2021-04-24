import { Injectable } from '@angular/core';
import {Formation} from '../../api/objects/Formation';
import {Observable} from 'rxjs';
import {ParentApiService} from './parent.api.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService extends ParentApiService{

  constructor(private httpClient: HttpClient) {
    super();
  }


  create(formation: Formation): Observable<Formation> {
    return this.httpClient.post<Formation>(environment.apiUrl + '/rest/api/formation/create', formation);
  }
}
