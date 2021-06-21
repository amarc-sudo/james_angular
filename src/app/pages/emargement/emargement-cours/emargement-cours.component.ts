import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cours} from '../../../api/objects/Cours';
import {CoursService} from '../../../service/api/cours.service';
import {PresenceService} from '../../../service/api/presence.service';
import {Observable} from 'rxjs';
import {Professeur} from '../../../api/objects/Professeur';
import {ProfesseurService} from '../../../service/api/professeur.service';
import {EtudiantService} from '../../../service/api/etudiant.service';
import {materialize, tap} from 'rxjs/operators';
import {Matiere} from '../../../api/objects/Matiere';
import {MatiereService} from '../../../service/api/matiere.service';
import {Presence} from '../../../api/objects/Presence';
import {TableData} from '../../../api/objects/TableData';
import {Formation} from '../../../api/objects/Formation';
import {Form} from '@angular/forms';
import {getTime} from 'ngx-bootstrap/chronos/utils/date-getters';
import {formatDate} from "@angular/common";
import {Etudiant} from '../../../api/objects/Etudiant';
import {reflectTypeEntityToDeclaration} from '@angular/compiler-cli/src/ngtsc/reflection';
import {Format} from "@angular-devkit/build-angular/src/extract-i18n/schema";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  listeMatieresFiltrees: Matiere[] = [];
  listPresencesToSave: Presence[] = [];
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
              private professeurService: ProfesseurService, private etudiantService: EtudiantService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.professeurService.read(Number(sessionStorage.getItem('id'))).subscribe(result => { // changer pour mettre idProf que pour les profs et pas la secrétaire;
      this.professeur = result;
      this.listFormations = this.professeur.formations;
      this.formationSelectionnee = this.listFormations[0].idFormation;
      this.matiereService.listByListFormation(this.listFormations).subscribe(matieres => {
        this.listMatieres = matieres;
        this.listeMatieresFiltrees = this.listMatieres.filter(matiere => matiere.formation.idFormation == this.formationSelectionnee);
      });
      this.etudiantService.listByFormation(this.listFormations).subscribe(etudiants => {
        this.listEtudiants = etudiants;
        this.etudiantsFormation = this.listEtudiants.filter(etudiant => etudiant.formation.idFormation == this.formationSelectionnee);
        this.etudiantsFormation.forEach(etudiant => {
          const presence = new Presence();
          const data = new TableData();
          data.code = 'pre';
          presence.etudiant = etudiant;
          presence.etatPresence = data;
          this.listPresencesToSave.push(presence);
        });
      });
    });
    const hourBeginning = new Date().getHours();
    const minuteZero = '00';
    const heureCompleteDebutTexte = hourBeginning + ':' + minuteZero;
    const heureCompleteFinTexte = (hourBeginning + 1) + ':' + minuteZero;
    this.heureDebut = this.conversionModel(heureCompleteDebutTexte);
    this.heureFin = this.conversionModel(heureCompleteFinTexte);
  }

  enregistrer(): void {
    const cours = new Cours();
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
    console.log(cours);
    cours.professeur = this.professeur;
    const data = new TableData();
    data.code = 'non_env';
    cours.etat = data;
    this.coursService.create(cours).pipe(tap(c => {
      this.listPresencesToSave.forEach(presence => presence.cours = c);
      this.presenceService.createList(this.listPresencesToSave).subscribe(c1 => {
        this.updating = false;
        this.snackBar.open('Le cours du ' + c.date + ' de la formation ' + c.matiere.formation.intitule + ' a bien été ajouté', 'OK', {
          duration: 3000
        });
      });
    })).subscribe();
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

  updateListPresences(etudiant: Etudiant): void {
    const tableData = new TableData();
    tableData.code = (document.getElementById(String(etudiant.idEtudiant)) as HTMLSelectElement).value;
    this.listPresencesToSave.forEach(presence => {
      if (presence.etudiant.idEtudiant == etudiant.idEtudiant) {
        presence.etatPresence = tableData;
      }
    });
  }

  updateListEtudiants(idFormationSelectionnee: number): void {
    this.etudiantsFormation = [];
    this.etudiantsFormation = this.listEtudiants.filter(etudiant => etudiant.formation.idFormation == idFormationSelectionnee);
    this.listPresencesToSave = [];
    this.etudiantsFormation.forEach(etudiant => {
      const presence = new Presence();
      const data = new TableData();
      data.code = 'pre';
      presence.etudiant = etudiant;
      presence.etatPresence = data;
      this.listPresencesToSave.push(presence);
    });
  }

  updateListMatieres(): void {
    this.formationSelectionnee = parseInt((document.getElementById('formation') as HTMLSelectElement).value, 10);
    this.listeMatieresFiltrees = this.listMatieres.filter(matiere => matiere.formation.idFormation == this.formationSelectionnee);
    this.updateListEtudiants(this.formationSelectionnee);
  }

  getPresenceIndexByID(idPresence: number): number {
    for (let i = 0; i < idPresence; i++) {
      if (this.listPresencesToSave[i].idPresence === idPresence) {
        return i;
      }
    }
    return 0;
  }

}
