import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ParentApiService} from './parent.api.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService extends ParentApiService{
  constructor(private httpClient: HttpClient) {
    super();
  }
  getData( path: string, element: any ): Observable<any[]> {
    if ( element == null) {
      return this.httpClient.get<any[]>(this.api + path);
    }else {
      return this.httpClient.post<any[]>(this.api + path, element);
    }
  }

}
