import { Component, OnInit } from '@angular/core';
import {CoursService} from '../../../service/api/cours.service';
import {LogService} from '../../../service/api/log.service';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Cours} from '../../../api/objects/Cours';
import {Log} from '../../../api/objects/Log';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.css']
})
export class AdminLogComponent implements OnInit {

  listLog$: Observable<Log[]>;

  listLog;

  subscriptions: Subscription[] = [];

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  LIST;
  term = '';
  constructor(private logService: LogService, private pipe: DecimalPipe){ }

  ngOnInit(): void {
    this.listLog$ = this.logService.getLog();
    this.subscriptions.push(this.listLog$.pipe(tap(list => {
      console.log(list);
      list.sort(function(a, b) {
        // tslint:disable-next-line:prefer-const one-variable-per-declaration
        var dateA = a.id, dateB = b.id;
        // @ts-ignore
        return dateB - dateA;
      });

        for (let i = 0; i < list.length; i++) {
          list[i]['id'] = i+1;
        }
        this.LIST = list;
        // tslint:disable-next-line:prefer-for-of
        this.collectionSize = this.LIST.length;
        this.listLog = this.LIST
          .map((country, i) => ({id: i + 1, ...country}))
          .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
        console.log(this.listLog);

    })).subscribe());

  }

  test(element){
    console.log(element);
  }

  refreshList() {
    this.collectionSize = this.search(this.term).length;
    this.listLog = this.search(this.term)
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  // tslint:disable-next-line:typedef

  search(text: string) {
    return this.LIST.filter(country => {
      const term = text.toLowerCase();
      return country.type.toLowerCase().includes(term);
    });
  }


}
