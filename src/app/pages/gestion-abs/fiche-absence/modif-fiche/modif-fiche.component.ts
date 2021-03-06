import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cours} from '../../../../api/objects/Cours';
import {CoursService} from '../../../../service/api/cours.service';
import {PresenceService} from '../../../../service/api/presence.service';
import {Observable} from 'rxjs';
import * as moment from 'moment-timezone';
import {Professeur} from '../../../../api/objects/Professeur';
import {ProfesseurService} from '../../../../service/api/professeur.service';
import {materialize, tap} from 'rxjs/operators';
import {Matiere} from '../../../../api/objects/Matiere';
import {MatiereService} from '../../../../service/api/matiere.service';
import {Presence} from '../../../../api/objects/Presence';
import {TableData} from '../../../../api/objects/TableData';
import {Personne} from '../../../../api/objects/Personne';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modif-fiche',
  templateUrl: './modif-fiche.component.html',
  styleUrls: ['./modif-fiche.component.css']
})
export class ModifFicheComponent implements OnInit {

  idCours: number;

  cours$: Observable<Cours>;

  listProfesseurs: Professeur[];

  listMatieres: Matiere[];

  listPresences: Presence[];

  positionProfesseur: number;
  positionMatiere: number;
  heureDebut: any;
  heureFin: any;
  errorTime = false;

  updating = false;

  constructor(private route: ActivatedRoute, private coursService: CoursService, private presenceService: PresenceService,
              private matiereService: MatiereService,
              private snackBar: MatSnackBar,
              private professeurService: ProfesseurService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idCours = params.idCours;
    });
    if (this.idCours != null) {
      this.cours$ = this.coursService.read(this.idCours).pipe(tap(cours => {
          this.professeurService.listByFormation(cours.matiere.formation.idFormation).subscribe(result => this.listProfesseurs = result);
          this.matiereService.listByFormation(cours.matiere.formation.idFormation).subscribe(result => this.listMatieres = result);
          this.positionProfesseur = cours.professeur.idProfesseur;
          this.positionMatiere = cours.matiere.idMatiere;
          this.listPresences = cours.presences;
          this.heureDebut = this.conversionModel(cours.begin);
          this.heureFin = this.conversionModel(cours.end);
          if (cours.etat.code === 'env') {
            this.router.navigate(['accueil']);
          }
        }
      ));
    }
  }

  enregistrer(cours: Cours): void {

    this.listMatieres.forEach(matiere => {
        if (matiere.idMatiere == this.getValueOfElementSelectID('matiere')) {
          cours.matiere = matiere;
        }
      }
    );
    this.listProfesseurs.forEach(professeur => {
        if (professeur.idProfesseur == this.getValueOfElementSelectID('professeur')) {
          cours.professeur = professeur;
        }
      }
    );
    const personne = new Personne();
    personne.idPersonne = parseInt(sessionStorage.getItem('idPersonne'), 10);
    cours.begin = this.conversionInverse(this.heureDebut);
    cours.end = this.conversionInverse(this.heureFin);
    cours.lastModifDate = new Date();
    cours.lastModifId = personne;
    this.errorTime = false;
    this.updating = true;
    const coursId = new Cours();
    coursId.idCours = cours.idCours;
    this.listPresences.forEach(presence => presence.cours = coursId);
    this.presenceService.update(this.listPresences).subscribe();
    this.coursService.update(cours).subscribe(() => {
        const date = new Date(cours.date);
        date.setTime(date.getTime() + 3000 * 60 * 60);
        this.updating = false;
        this.snackBar.open('Le cours du ' + cours.date + ' de la formation ' + cours.matiere.formation.intitule + ' a bien ??t?? modifi??', 'OK', {
          duration: 3000
        });
        this.router.navigate(['accueil/gestion-abs/fiche-presence'], {
          queryParams: {
            id: cours.matiere.formation.idFormation,
            date: date.toISOString().substring(0, 10)
          }
        });
      }
    );

  }

  getValueOfElementSelectID(id: string): any {
    const select = (document.getElementById(id)) as HTMLSelectElement;
    const indice = select.selectedIndex;
    const options = select.options[indice];
    return options.value;
  }

  conversionModel(horaire: string): any {
    // tslint:disable-next-line:radix
    return {hour: parseInt(horaire.substring(0, 2)), minute: parseInt(horaire.substring(3, 5))};
  }

  conversionInverse(horaireModel: any): string {
    if (horaireModel == null) {
      this.errorTime = true;
    }
    return horaireModel.hour + ':' + horaireModel.minute + ':00';
  }

  updateListPresences(idPresence: number): void {
    const tableData = new TableData();
    tableData.code = (document.getElementById(String(idPresence)) as HTMLSelectElement).value;
    this.listPresences[this.getPresenceIndexByID(idPresence)].etatPresence = tableData;
  }

  getPresenceIndexByID(idPresence: number): number {
    for (let i = 0; i < idPresence; i++) {
      if (this.listPresences[i].idPresence === idPresence) {
        return i;
      }
    }
    return 0;
  }
}
