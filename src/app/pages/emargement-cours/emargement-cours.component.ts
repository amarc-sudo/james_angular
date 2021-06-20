import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cours} from '../../api/objects/Cours';
import {CoursService} from '../../service/api/cours.service';
import {PresenceService} from '../../service/api/presence.service';
import {Observable} from 'rxjs';
import {Professeur} from '../../api/objects/Professeur';
import {ProfesseurService} from '../../service/api/professeur.service';
import {EtudiantService} from '../../service/api/etudiant.service';
import {materialize, tap} from 'rxjs/operators';
import {Matiere} from '../../api/objects/Matiere';
import {MatiereService} from '../../service/api/matiere.service';
import {Presence} from '../../api/objects/Presence';
import {TableData} from '../../api/objects/TableData';
import {Formation} from '../../api/objects/Formation';
import {Form} from '@angular/forms';
import {getTime} from 'ngx-bootstrap/chronos/utils/date-getters';
import {formatDate} from "@angular/common";
import {Etudiant} from '../../api/objects/Etudiant';
import {reflectTypeEntityToDeclaration} from '@angular/compiler-cli/src/ngtsc/reflection';

@Component({
  selector: 'app-emargement-cours',
  templateUrl: './emargement-cours.component.html',
  styleUrls: ['./emargement-cours.component.css']
})

export class EmargementCoursComponent implements OnInit {

  idCours: number;

  cours$: Observable<Cours>;

  idProf = parseInt(sessionStorage.getItem('id'), 10);
  // le deuxième nombre indique la base avec laquelle on travaille, ici la base décimale (10)

  listFormations: Formation[];

  listMatieres: Matiere[];

  listPresences: Presence[];
  listEtudiants: Etudiant[];
  etudiantsFormation: Etudiant[] = [];

  professeur: Professeur;

  formationSelectionnee: number;

  heureDebut: any;
  heureFin: any;
  errorTime = false;

  updating = false;

  constructor(private route: ActivatedRoute, private coursService: CoursService, private presenceService: PresenceService,
              private matiereService: MatiereService,
              private professeurService: ProfesseurService, private etudiantService: EtudiantService, private router: Router) {
  }

  ngOnInit(): void {
    this.professeurService.read(9).subscribe(result => { // changer pour mettre idProf que pour les profs et pas la secrétaire;
      this.professeur = result;
      this.listFormations = this.professeur.formations;
      this.etudiantService.listByFormations(this.listFormations).subscribe(etudiants => {
        this.listEtudiants = etudiants;

      });
    });
    const hourBeginning = new Date().getHours();
    const minuteZero = '00';
    const heureCompleteDebutTexte = hourBeginning + ':' + minuteZero;
    const heureCompleteFinTexte = (hourBeginning + 1) + ':' + minuteZero;
    this.heureDebut = this.conversionModel(heureCompleteDebutTexte);
    this.heureFin = this.conversionModel(heureCompleteFinTexte);


    // this.idCours = 40;
    /*if (this.idCours != null) {
      this.cours$ = this.coursService.read(this.idCours).pipe(tap(cours => {
         // this.professeurService.listByFormation(cours.matiere.formation.idFormation).subscribe(result => this.listProfesseurs = result);
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
    }*/
  }

  enregistrer(cours: Cours): void {

    this.listMatieres.forEach(matiere => {
        if (matiere.idMatiere == this.getValueOfElementSelectID('matiere')) {
          cours.matiere = matiere;
        }
      }
    );

    cours.begin = this.conversionInverse(this.heureDebut);
    cours.end = this.conversionInverse(this.heureFin);

    this.errorTime = false;
    this.updating = true;
    const coursId = new Cours();
    coursId.idCours = cours.idCours;
    this.listPresences.forEach(presence => presence.cours = coursId);
    // this.presenceService.update(this.listPresences).subscribe();
    this.presenceService.createList(this.listPresences).subscribe();
    this.coursService.update(cours).subscribe(() => {
        const date = new Date(cours.date);
        date.setTime(date.getTime() + 3000 * 60 * 60);
        this.updating = false;
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

  updateListPresences2(etudiant: Etudiant): void {
    const tableData = new TableData();
    tableData.code = (document.getElementById(String(etudiant.personne.idPersonne)) as HTMLSelectElement).value;
    console.log(tableData.code + '/');
    this.listPresences.push(etudiant.personne.idPersonne);
    console.log(this.listPresences[this.getPresenceIndexByID2(etudiant.personne.idPersonne)].etatPresence);
    // this.listPresences[this.getPresenceIndexByID(idPresence)].etatPresence = tableData;
  }

  updateListEtudiants(idFormationSelectionnee: number): void {
    this.etudiantsFormation = [];
    this.etudiantService.listByFormations(this.listFormations).subscribe(etudiants => {
      this.listEtudiants = etudiants;
      this.listEtudiants.forEach(etudiant => {
        if (etudiant.formation.idFormation == idFormationSelectionnee && this.etudiantsFormation.includes(etudiant) == false) {
          this.etudiantsFormation.push(etudiant);
        }
      });
    });
  }

  updateListMatieres(): void {
    this.listFormations.forEach(formation => {
        if (formation.idFormation == this.getValueOfElementSelectID('formation')) {
          const idFormation = formation.idFormation;
          this.matiereService.listByFormation(idFormation).subscribe(result => {
            this.listMatieres = result;
          });
        }
      }
    );
    this.updateListEtudiants(this.getValueOfElementSelectID('formation'));
  }

  getPresenceIndexByID(idPresence: number): number {
    for (let i = 0; i < idPresence; i++) {
      if (this.listPresences[i].idPresence === idPresence) {
        return i;
      }
    }
    return 0;
  }

  getPresenceIndexByID2(idPersonne: number): number {
    for (let i = 0; i < idPersonne; i++) {
      if (this.listPresences[i].etudiant.personne.idPersonne === idPersonne) {
        return i;
      }
    }
    return 0;
  }
}
