import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {Etudiant} from '../../../api/objects/Etudiant';
import {Personne} from '../../../api/objects/Personne';
import {switchMapTo, tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PersonneService} from '../../../service/api/personne.service';
import {EtudiantService} from '../../../service/api/etudiant.service';
import {ToastrService} from 'ngx-toastr';
import {MatSnackBar} from '@angular/material/snack-bar';

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

  @Output() resetView = new EventEmitter<number>();

  constructor(private personneService: PersonneService, private etudiantService: EtudiantService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // On récupère les formations
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
  }

  addEtudiant(): void {
    const etudiant: Etudiant = new Etudiant();
    const formation: Formation = new Formation();
    const personne: Personne = new Personne();
    formation.idFormation = parseInt((document.getElementById('formation') as HTMLSelectElement).value, 10);
    etudiant.formation = formation;
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
    etudiant.adresseMail = (document.getElementById('adresse-mail') as HTMLInputElement).value;
    etudiant.personne = personne;
    if (this.errorAdresseMail || this.errorPrenom || this.errorNom) {
      return;
    }
    if ((document.getElementById('groupe') as HTMLSelectElement).value != '') {
      etudiant.groupe = parseInt((document.getElementById('groupe') as HTMLSelectElement).value, 10);
    }
    this.subscriptions.push(this.personneService.create(etudiant.personne).pipe(tap(personneRetour =>
        etudiant.personne = personneRetour),
      switchMapTo(this.etudiantService.create(etudiant)),
    ).subscribe(() => {
      this.snackBar.open('L\'étudiant(e) ' + personne.nom.toUpperCase() + ' ' + personne.prenom + ' a bien été ajouté(e)', 'OK', {
        duration: 3000
      });
      this.resetView.emit(0);
      (document.getElementById('groupe' ) as HTMLSelectElement).value = '';
      (document.getElementById('adresse-mail') as HTMLInputElement).value = '';
      (document.getElementById('prenom') as HTMLInputElement).value = '';
      (document.getElementById('nom') as HTMLInputElement).value = '';
    }));
  }
}
