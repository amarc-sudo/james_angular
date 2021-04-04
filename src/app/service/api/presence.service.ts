import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentApiService} from './parent.api.service';
import {Observable} from 'rxjs';
import {Cours} from '../../api/objects/Cours';
import {environment} from '../../../environments/environment';
import {Presence} from '../../api/objects/Presence';

@Injectable({
  providedIn: 'root'
})
export class PresenceService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  update(listPresences: Presence[]): Observable<Presence[]> {
    return this.httpClient.patch<Presence[]>(environment.apiUrl + '/rest/api/presence/updateList', listPresences
    );
  }

}
