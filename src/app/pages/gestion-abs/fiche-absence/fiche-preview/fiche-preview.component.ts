import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cours} from '../../../../api/objects/Cours';
import {CoursService} from '../../../../service/api/cours.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Presence} from '../../../../api/objects/Presence';
import {tap} from 'rxjs/operators';
import {Formation} from '../../../../api/objects/Formation';
import {faAngleRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import {TableData} from '../../../../api/objects/TableData';
import {TableDataService} from '../../../../service/api/table.data.service';
import {HistoriqueFicheService} from '../../../../service/api/historique-fiche.service';
import * as FileSaver from 'file-saver';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fiche-preview',
  templateUrl: './fiche-preview.component.html',
  styleUrls: ['./fiche-preview.component.css']
})
export class FichePreviewComponent implements OnInit, OnDestroy {

  listCours$: Observable<Cours[]>;

  idFormation: number;

  date: string;

  positionDiapo: number;

  faFlecheDroite = faAngleRight;

  faFlecheGauche = faAngleLeft;

  formation: Formation;

  loadingPDF = false;

  subscriptions: Subscription[] = [];
  spinner = faSpinner;


  envoye: TableData;
  non_envoye: TableData;

  nombreCours: number;

  // tslint:disable-next-line:max-line-length
  constructor(private coursService: CoursService, private historiqueFicheService: HistoriqueFicheService, private tableDataService: TableDataService, private route: ActivatedRoute, private router: Router,  private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idFormation = params.id;
      this.date = params.date;
    });
    if (this.idFormation !== undefined && this.date !== undefined) {
      this.listCours$ = this.coursService.listByFormationAndDate(this.idFormation, this.date);

      this.subscriptions.push(this.listCours$.pipe(tap(list => {
        if (list.length > 0) {
          this.formation = list[0].matiere.formation;
          this.positionDiapo = 0;
          this.nombreCours = list.length;
        }
      })).subscribe());
      this.subscriptions.push(this.tableDataService.readByCode('env').subscribe(result => this.envoye = result));
      this.tableDataService.readByCode('non_env').subscribe(result => this.non_envoye = result);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach(subscription => subscription.unsubscribe());
  }

  nombreAbsents(presences: Presence[]): number {
    return (presences.filter(presence => presence.etatPresence.code === 'abs')).length;

  }

  nombreRetards(presences: Presence[]): number {
    return (presences.filter(presence => presence.etatPresence.code === 'ret')).length;
  }

  pdfGeneration(listCours: Cours[]): void {
    this.loadingPDF = true;
    if (listCours.filter(cours => cours.etat.idData !== this.envoye.idData).length > 0) {
      listCours.forEach(cours => {
          cours.etat = this.envoye;
          // @ts-ignore
          this.subscriptions.push(this.coursService.update(cours).subscribe());
        }
      );
      this.subscriptions.push(this.coursService.readFichePresence(this.idFormation, this.date).pipe(
        tap(response => {
          if ( response.size !== 0) {
            FileSaver.saveAs(new Blob([response], {type: 'application/pdf'}), this.date + '-' + this.formation.intitule);
            this.loadingPDF = false;
          }else{
            listCours.forEach(cours => {
                cours.etat = this.non_envoye;
                // @ts-ignore
                this.subscriptions.push(this.coursService.update(cours).subscribe());
              }
            );
            this.snackBar.open('Erreur de la génération : contacter l\'administrateur', 'OK', {
              duration: 3000
            });
            this.loadingPDF = false;
          }
        })
      ).subscribe());
    } else {
      this.subscriptions.push(this.historiqueFicheService.readFichePresence(this.idFormation, this.date).pipe(
        tap(response => {
          console.log(response);
          if ( response.size !== 0) {
            FileSaver.saveAs(new Blob([response], {type: 'application/pdf'}), this.date + '-' + this.formation.intitule);
            this.loadingPDF = false;
          }else{
            listCours.forEach(cours => {
                cours.etat = this.non_envoye;
                console.log(cours.etat);
                // @ts-ignore
                this.subscriptions.push(this.coursService.update(cours).subscribe());
              }
            );
            this.snackBar.open('Erreur de la génération : contacter l\'administrateur', 'OK', {
              duration: 3000
            });
            this.loadingPDF = false;
          }
        })
      ).subscribe());
    }


  }

  increasePositionDiapo(): void {
    this.positionDiapo++;
  }


  decreasePositionDiapo(): void {
    this.positionDiapo--;
  }

  goToModification(idCours: number): void {
    this.router.navigate(['/accueil/gestion-abs/fiche-presence/modification'], {queryParams: {idCours: idCours.toString()}});
  }

  changementPositionDiapo(indice: number): void {
    this.positionDiapo = indice;
  }
}
