import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Cours} from '../../../../service/api/objects/Cours';
import {CoursService} from '../../../../service/api/cours.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Presence} from '../../../../service/api/objects/Presence';
import {tap} from 'rxjs/operators';
import {Formation} from '../../../../service/api/objects/Formation';
import {faAngleRight, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons/faAngleLeft';
import {TableData} from '../../../../service/api/objects/TableData';
import {TableDataService} from '../../../../service/api/table.data.service';

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

  nombreCours: number;

  // tslint:disable-next-line:max-line-length
  constructor(private coursService: CoursService, private tableDataService: TableDataService, private route: ActivatedRoute, private router: Router) {
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
    listCours.forEach(cours => {
        cours.etat = this.envoye;
        // @ts-ignore
        this.subscriptions.push(this.coursService.update(cours).subscribe());
      }
    )
    ;
    this.subscriptions.push(this.coursService.readFichePresence(this.idFormation, this.date).pipe(
      tap(response => {
        const file = new Blob([response], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
        this.loadingPDF = false;
      })
    ).subscribe());
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
