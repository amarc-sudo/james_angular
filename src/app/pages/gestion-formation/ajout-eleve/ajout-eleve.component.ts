import {Component, OnInit} from '@angular/core';
import {Formation} from "../../../api/objects/Formation";
import {Etudiant} from "../../../api/objects/Etudiant";
import {Personne} from "../../../api/objects/Personne";
import {switchMapTo, tap} from "rxjs/operators";
import {Subscription} from "rxjs";
import {PersonneService} from "../../../service/api/personne.service";
import {EtudiantService} from "../../../service/api/etudiant.service";

@Component({
  selector: 'app-ajout-eleve',
  templateUrl: './ajout-eleve.component.html',
  styleUrls: ['./ajout-eleve.component.css']
})
export class AjoutEleveComponent implements OnInit {

  listFormations: Formation[] = [];

  updating = false;

  errorNom = false;

  subscriptions: Subscription[] = [];

  errorPrenom = false;

  errorAdresseMail = false;

  constructor(private personneService: PersonneService, private etudiantService: EtudiantService) {
  }

  ngOnInit(): void {
    // On récupère les formations
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
    console.log(this.listFormations);
  }

  addEtudiant(): void {
    const etudiant: Etudiant = new Etudiant();
    const formation: Formation = new Formation();
    const personne: Personne = new Personne();
    formation.idFormation = parseInt((document.getElementById('formation') as HTMLSelectElement).value, 10);
    etudiant.formation = formation;
    if ((document.getElementById('nom') as HTMLInputElement).value === '') {
      this.errorNom = true;
      return;
    }
    personne.nom = (document.getElementById('nom') as HTMLInputElement).value;
    if ((document.getElementById('prenom') as HTMLInputElement).value === '') {
      this.errorPrenom = true;
      return;
    }
    personne.prenom = (document.getElementById('prenom') as HTMLInputElement).value;
    if ((document.getElementById('adresse-mail') as HTMLInputElement).value === '') {
      this.errorAdresseMail = true;
      return;
    }
    etudiant.adresseMail = (document.getElementById('adresse-mail') as HTMLInputElement).value;
    etudiant.personne = personne;
    this.subscriptions.push(this.personneService.create(etudiant.personne).pipe(tap(personneRetour =>
        etudiant.personne = personneRetour),
      switchMapTo(this.etudiantService.create(etudiant)),
    ).subscribe());
  }
}
