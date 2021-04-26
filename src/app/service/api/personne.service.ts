import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Etudiant} from '../../api/objects/Etudiant';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {ParentApiService} from './parent.api.service';
import {Personne} from '../../api/objects/Personne';

@Injectable({
  providedIn: 'root'
})
export class PersonneService extends ParentApiService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(personne: Personne): Observable<Personne> {
    return this.httpClient.post<Personne>(environment.apiUrl + '/rest/api/personne/create', personne);
  }
}
