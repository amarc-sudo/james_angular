import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {TableDataService} from '../../service/api/table.data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  entete: string[];
  enteteTaille: string[];
  elementTable: any;

  constructor(private router: Router, private api: TableDataService) {
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
    this.api.getData('/rest/api/cours/getCoursNoSend', { id : Number(sessionStorage.getItem('id')) }).subscribe(data => {
      this.elementTable = data;
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log('coucou');
  }

}
