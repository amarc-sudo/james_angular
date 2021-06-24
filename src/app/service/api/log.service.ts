import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ParentApiService} from './parent.api.service';
import {Cours} from '../../api/objects/Cours';
import {Log} from '../../api/objects/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService extends ParentApiService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  getLog(): Observable<any> {
    return this.httpClient.get<Log[]>(environment.apiUrl + '/rest/api/log/listAll');
  }
}
