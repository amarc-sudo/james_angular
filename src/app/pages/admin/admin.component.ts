import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TableService} from '../../service/table/table.service';
import {CallAPIService} from '../../service/api/call-api.service';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit{

  private prenom: string;
  private nom: string;
  private table: TableService;
  private entete: string[];
  private enteteTaille: string[];
  private html: string;
  public elementTable: any;
  private bool: boolean;

  constructor(private router: Router, private api: CallAPIService, private sanitizer: DomSanitizer) {
    this.prenom = sessionStorage.getItem('prenom');
    this.nom = sessionStorage.getItem('nom');
    // tslint:disable-next-line:label-position
    this.entete = [
      'formation',
      'date',
      'absent',
      'en retard'
    ];
    this.enteteTaille = [
      'style="width :30%"',
      'style="width :30%"',
      'style="width :10%"',
      'style="width :30%"'
    ];
    this.table = new TableService(this.entete, this.enteteTaille);
    this.api.getData('/rest/api/cours/getCoursNoSend', { id : Number(sessionStorage.getItem('id')) }).subscribe(data => {
        this.elementTable = data;
        this.createTable();
    });

  }


  ngOnInit(): void {
  }

  getPrenom(): string {
    console.log(sessionStorage.getItem('formations'));
    return this.prenom + ' ' + this.nom;
  }

  // tslint:disable-next-line:typedef
  change(s: string) {
    this.router.navigate([s]);
  }

  getTable(): any{
    return this.sanitizer.bypassSecurityTrustHtml(this.html);
  }

  createTable(): void{
    this.table.debutTable();
    this.table.addContenu(this.elementTable);
    this.html = this.table.finTable();
  }

}
