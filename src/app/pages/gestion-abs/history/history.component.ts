import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {TableDataService} from '../../../shared/service/api/table.data.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  entete: string[];
  enteteTaille: string[];
  elementTable: any;
  observable$: Observable<any>;

  constructor(private router: Router, private api: TableDataService) {

  }

  ngOnInit(): void {
    this.entete = [
      'formation',
      'date',
      'absent',
      'en retard'
    ];
    this.enteteTaille = [
      'width :30%',
      'width :30%',
      'width :10%',
      'width :30%'
    ];
    this.observable$ = this.api.getData('/rest/api/cours/getCoursSend', { id : Number(sessionStorage.getItem('id')) });
  }

  onSubmit(form: NgForm): void {
    console.log('coucou');
  }

}
