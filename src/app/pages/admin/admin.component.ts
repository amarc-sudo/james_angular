import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TableDataService} from '../../service/api/table.data.service';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  prenom: string;
  nom: string;
  entete: string[];
  enteteTaille: string[];
  html: string;
  elementTable: any;
  bool: boolean;

  constructor(private router: Router, private api: TableDataService) {
    this.prenom = sessionStorage.getItem('prenom');
    this.nom = sessionStorage.getItem('nom');
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

  getPrenom(): string {
    return this.prenom + ' ' + this.nom;
  }

  change(s: string): void {
    this.router.navigate([s]);
  }

}
