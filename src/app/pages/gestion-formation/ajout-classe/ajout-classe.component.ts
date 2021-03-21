import {Component, OnInit} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {Etudiant} from '../../../api/objects/Etudiant';
import {Personne} from '../../../api/objects/Personne';
import {Subscription} from 'rxjs';
import {PersonneService} from '../../../service/api/personne.service';
import {EtudiantService} from '../../../service/api/etudiant.service';
import {switchMapTo, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ajout-classe',
  templateUrl: './ajout-classe.component.html',
  styleUrls: ['./ajout-classe.component.css']
})
export class AjoutClasseComponent implements OnInit {


  constructor(private personneService: PersonneService, private etudiantService: EtudiantService, private router: Router) {
  }

  subscriptions: Subscription[] = [];

  listFormations: Formation[] = [];

  listEtudiants: Etudiant[] = [];

  erreur = false;

  uploading = false;

  ngOnInit(): void {
    // On récupère les formations
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
  }

  handleFileSelect($event: any): void {
    const files = $event.target.files; // FileList object
    const file = files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result;
      const csvRecordsArray = (csvData as string).split(/\r\n|\n/);
      const listTemporaireEtudiant = this.getEtudiantArrayFromCSVFile(csvRecordsArray);
      if (listTemporaireEtudiant != null) {
        this.erreur = false;
        this.listEtudiants = listTemporaireEtudiant;
      }
    };
  }

  getEtudiantArrayFromCSVFile(csvRecordsArray: any): Etudiant[] {
    const etudiantList: Etudiant[] = [];

    for (let i = 0; i < csvRecordsArray.length; i++) {
      const ligneCSV = (csvRecordsArray[i] as string).split(',');
      const etudiant = new Etudiant();
      const personne = new Personne();
      if (ligneCSV.length !== 4) {
        this.erreur = true;
        return null;
      }
      personne.nom = ligneCSV[0].trim();
      personne.prenom = ligneCSV[1].trim();
      etudiant.adresseMail = ligneCSV[2].trim();
      if (ligneCSV[3] !== '' && ligneCSV[3] === '1' || ligneCSV[3] === '2') {
        etudiant.groupe = parseInt(ligneCSV[3].trim(), 10);
      }
      etudiant.personne = personne;

      etudiantList.push(etudiant);
    }
    return etudiantList;
  }


  changeNomValue($event: any, index: number): void {
    this.listEtudiants[index].personne.nom = $event.target.value;
  }

  changePrenomValue($event: any, index: number): void {
    this.listEtudiants[index].personne.prenom = $event.target.value;
  }


  ajouterEtudiants(): void {
    const formation = new Formation();
    this.uploading = true;
    formation.idFormation = parseInt((document.getElementById('formation') as HTMLSelectElement).value, 10);
    for (let i = 0; i < this.listEtudiants.length; i++) {
      this.listEtudiants[i].formation = formation;
      this.subscriptions.push(this.personneService.create(this.listEtudiants[i].personne).pipe(tap(personne =>
          this.listEtudiants[i].personne = personne),
        switchMapTo(this.etudiantService.create(this.listEtudiants[i])),
      ).subscribe(result => {
        if (i === this.listEtudiants.length - 1) {
          this.uploading = false;
          this.router.navigate(['accueil/gestion-formation']);
        }
      }));
    }
  }

  changeAdresseMailValue($event: any, index: number): void {
    this.listEtudiants[index].adresseMail = $event.target.value;
  }

  changeGroupe($event: any, index: number): void {
    this.listEtudiants[index].groupe = $event.target.value === '' ? null : parseInt($event.target.value, 10);
  }


}
