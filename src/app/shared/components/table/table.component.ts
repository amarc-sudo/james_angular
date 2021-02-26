import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input()
  entete: string[];

  @Input()
  tailleEnTete: string[];

  @Input()
  donneesTable: any[];

  @Input()
  pathFromHistory = false;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToFiche(date: string, formation: string): void {
    if (this.pathFromHistory) {
      this.router.navigate(['/accueil/historique/fiche-presence'], {queryParams: {id: formation, date: date}});
    } else {
      this.router.navigate(['/accueil/gestion-abs/fiche-presence'], {queryParams: {id: formation, date: date}});
    }
  }

  ngOnChanges(): void {
    console.log(this.donneesTable);
  }

}
