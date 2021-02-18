import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ParentApiService} from './parent.api.service';
import {Observable} from 'rxjs';
import {Cours} from '../../api/objects/Cours';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService extends ParentApiService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  update(map: Map<any, any>): Observable<void> {
    const convMap = {};
    map.forEach((val: string, key: string) => {
      convMap[key] = val;
    });
    return this.httpClient.patch<void>(environment.apiUrl + '/rest/api/presence/update', convMap
    );
  }

}
