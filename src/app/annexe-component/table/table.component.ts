import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {HistoriqueFicheService} from '../../service/api/historique-fiche.service';
import * as FileSaver from 'file-saver';
import {Formation} from '../../api/objects/Formation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input()
  entete: string[];

  @Input()
  tailleEnTete: string[];

  @Input()
  donneesTable: any[];

  @Input()
  pathFromHistory = false;

  subscriptions: Subscription[] = [];

  listFormations: Formation[] = [];


  constructor(private router: Router, private historiqueFicheService: HistoriqueFicheService) {
  }

  ngOnInit(): void {
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
  }

  goToFiche(date: string, formation: string): void {
    if (this.pathFromHistory) {
      this.subscriptions.push(this.historiqueFicheService.readFichePresence(parseInt(formation, 10), date).pipe(
        tap(response => {
          FileSaver.saveAs(new Blob([response], {type: 'application/pdf'})
            , date + '-' + this.listFormations.filter(a => a.idFormation === parseInt(formation, 10))[0].intitule);
        })
      ).subscribe());
    } else {
      this.router.navigate(['/accueil/gestion-abs/fiche-presence'], {queryParams: {id: formation, date}});
    }
  }


}
