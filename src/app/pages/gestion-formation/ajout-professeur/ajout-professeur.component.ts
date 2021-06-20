import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {Subscription} from 'rxjs';
import {PersonneService} from '../../../service/api/personne.service';
import {SecretaireService} from '../../../service/api/secretaire.service';
import {Secretaire} from '../../../api/objects/Secretaire';
import {Contact} from '../../../api/objects/Contact';
import {Personne} from '../../../api/objects/Personne';
import {switchMapTo, tap} from 'rxjs/operators';
import {Professeur} from '../../../api/objects/Professeur';
import {ProfesseurService} from '../../../service/api/professeur.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-professeur',
  templateUrl: './ajout-professeur.component.html',
  styleUrls: ['./ajout-professeur.component.css']
})
export class AjoutProfesseurComponent implements OnInit {


  listFormations: Formation[] = [];

  updating = false;

  errorNom = false;

  subscriptions: Subscription[] = [];

  errorPrenom = false;

  errorAdresseMail = false;

  @Output() resetView = new EventEmitter<number>();

  constructor(private personneService: PersonneService, private professeurService: ProfesseurService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // On récupère les formations
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
  }

  addProfesseur(): void {
    const professeur: Professeur = new Professeur();
    const contact: Contact = new Contact();
    const personne: Personne = new Personne();
    this.errorAdresseMail = false;
    this.errorNom = false;
    this.errorPrenom = false;
    if ((document.getElementById('nom') as HTMLInputElement).value === '') {
      this.errorNom = true;
    }
    personne.nom = (document.getElementById('nom') as HTMLInputElement).value;
    if ((document.getElementById('prenom') as HTMLInputElement).value === '') {
      this.errorPrenom = true;
    }
    personne.prenom = (document.getElementById('prenom') as HTMLInputElement).value;
    const mail = (document.getElementById('adresse-mail') as HTMLInputElement).value;
    if (mail === '' || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
      this.errorAdresseMail = true;
    }
    contact.adresseMail = (document.getElementById('adresse-mail') as HTMLInputElement).value;
    professeur.personne = personne;
    professeur.contact = contact;
    if (this.errorAdresseMail || this.errorPrenom || this.errorNom) {
      return;
    }
    this.subscriptions.push(this.personneService.create(professeur.personne).pipe(tap(personneRetour =>
        professeur.personne = personneRetour),
      switchMapTo(this.professeurService.create(professeur)),
    ).subscribe(() => {
      this.resetView.emit(0);
      this.snackBar.open('L\'enseignant(e) ' + personne.nom.toUpperCase() + ' ' + personne.prenom + ' a bien été ajouté(e)', 'OK', {
        duration: 3000
      });
    }));
  }
}
