import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParentApiService} from './parent.api.service';
import {TableData} from './objects/TableData';

@Injectable({
  providedIn: 'root'
})
export class TableDataService extends ParentApiService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  getData(path: string, element: any): Observable<any[]> {
    if (element == null) {
      return this.httpClient.get<any[]>(this.api + path);
    } else {
      return this.httpClient.post<any[]>(this.api + path, element);
    }
  }


  readByCode(code: string): Observable<TableData> {
    return this.httpClient.get<TableData>(this.api + '/rest/api/tableData/read?code=' + code);
  }

}
