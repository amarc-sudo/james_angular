import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallAPIService {

  api = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getData( path: string, element: any ): Observable<any[]> {
    if ( element == null) {
      return this.httpClient.get<any[]>(this.api + path);
    }else {
      return this.httpClient.post<any[]>(this.api + path, element);
    }
  }

}
