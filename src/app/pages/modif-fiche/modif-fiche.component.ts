import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cours} from '../../api/objects/Cours';
import {CoursService} from '../../service/api/cours.service';
import {PresenceService} from '../../service/api/presence.service';
import {Observable} from 'rxjs';
import * as moment from 'moment-timezone';
import {Professeur} from '../../api/objects/Professeur';
import {ProfesseurService} from '../../service/api/professeur.service';
import {materialize, tap} from 'rxjs/operators';
import {Matiere} from '../../api/objects/Matiere';
import {MatiereService} from '../../service/api/matiere.service';

@Component({
  selector: 'app-modif-fiche',
  templateUrl: './modif-fiche.component.html',
  styleUrls: ['./modif-fiche.component.css']
})
export class ModifFicheComponent implements OnInit {


  idCours: number;

  cours$: Observable<Cours>;

  setModifPresences = new Set<string>();

  listProfesseurs: Professeur[];

  listMatieres: Matiere[];
  positionProfesseur: number;
  positionMatiere: number;
  heureDebut: any;
  heureFin: any;

  constructor(private route: ActivatedRoute, private coursService: CoursService, private presenceService: PresenceService,
              private matiereService: MatiereService,
              private professeurService: ProfesseurService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idCours = params['idCours'];
    });
    if (this.idCours != null) {
      this.cours$ = this.coursService.read(this.idCours).pipe(tap(cours => {
          this.professeurService.listByFormation(cours.matiere.formation.idFormation).subscribe(result => this.listProfesseurs = result);
          this.matiereService.listByFormation(cours.matiere.formation.idFormation).subscribe(result => this.listMatieres = result);
          this.positionProfesseur = cours.professeur.idProfesseur;
          this.positionMatiere = cours.matiere.idMatiere;
          this.heureDebut = this.conversionModel(cours.begin);
          this.heureFin = this.conversionModel(cours.end);
          console.log(cours);
        }
      ));
    }
  }

  addChangementPresences(idPresence: string): void {
    this.setModifPresences.add(idPresence);
  }

  enregistrer(cours: Cours): void {
    let map = new Map();
    this.setModifPresences.forEach(idPresence => {
      map.set(idPresence, this.getValueOfElementSelectID(idPresence));
    });

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

    cours.begin = this.conversionInverse(this.heureDebut);
    cours.end = this.conversionInverse(this.heureFin);

    this.presenceService.update(map).subscribe();
    this.coursService.update(cours).subscribe(() => {
        const date = new Date(cours.date);
        date.setTime(date.getTime() + 1000 * 60 * 60);
        this.router.navigate(['admin/gestion-abs/fiche-presence'], {
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
    return horaireModel.hour + ':' + horaireModel.minute + ':00';
  }
}
