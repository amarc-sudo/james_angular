import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {Subscription} from 'rxjs';
import {PersonneService} from '../../../service/api/personne.service';
import {EtudiantService} from '../../../service/api/etudiant.service';
import {Etudiant} from '../../../api/objects/Etudiant';
import {Personne} from '../../../api/objects/Personne';
import {switchMapTo, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-modification-eleve-component',
  templateUrl: './modification-eleve-component.component.html',
  styleUrls: ['./modification-eleve-component.component.css']
})
export class ModificationEleveComponentComponent implements OnInit {

  listFormations: Formation[] = [];

  updating = false;

  errorNom = false;

  subscriptions: Subscription[] = [];

  errorPrenom = false;

  errorAdresseMail = false;

  idEtudiant: number;

  etudiantToUpdate: Etudiant;

  @Output() resetView = new EventEmitter<number>();

  constructor(private personneService: PersonneService,
              private etudiantService: EtudiantService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    // On récupère les formations
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      this.idEtudiant = params.idEtudiant;
    });

    if (this.idEtudiant !== undefined) {
      this.etudiantService.read(this.idEtudiant).pipe(tap(etudiant => {
        this.etudiantToUpdate = etudiant;
        (document.getElementById('adresse-mail') as HTMLInputElement).value = etudiant.adresseMail;
        (document.getElementById('nom') as HTMLInputElement).value = etudiant.personne.nom;
        (document.getElementById('prenom') as HTMLInputElement).value = etudiant.personne.prenom;
        (document.getElementById('formation') as HTMLInputElement).value = etudiant.formation.idFormation.toString(10);
        (document.getElementById('groupe') as HTMLInputElement).value = etudiant.groupe.toString(10);
      })).subscribe();
    }

  }

  addEtudiant(): void {
    const etudiant: Etudiant = new Etudiant();
    const formation: Formation = new Formation();
    const personne: Personne = new Personne();
    this.updating = true;
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
    personne.dateCreation = this.etudiantToUpdate.personne.dateCreation;
    etudiant.adresseMail = (document.getElementById('adresse-mail') as HTMLInputElement).value;
    personne.idPersonne = this.etudiantToUpdate.personne.idPersonne;
    etudiant.personne = personne;
    if (this.errorAdresseMail || this.errorPrenom || this.errorNom) {
      this.updating = false;
      return;
    }
    etudiant.idEtudiant = this.etudiantToUpdate.idEtudiant;
    if ((document.getElementById('groupe') as HTMLSelectElement).value != '') {
      etudiant.groupe = parseInt((document.getElementById('groupe') as HTMLSelectElement).value, 10);
    }
    this.subscriptions.push(this.personneService.update(etudiant.personne).pipe(tap(personneRetour =>
        etudiant.personne = personneRetour),
      switchMapTo(this.etudiantService.update(etudiant)),
    ).subscribe(() => {
      this.updating = false;
      this.snackBar.open('L\'étudiant(e) ' + this.etudiantToUpdate.personne.nom.toUpperCase() + ' ' + this.etudiantToUpdate.personne.prenom + ' a bien été modifié(e)', 'OK', {
        duration: 3000
      });
      this.router.navigate(['accueil/gestion-formation/consultation-eleve'], {queryParams: {idEtudiant: etudiant.idEtudiant}});
    }));
  }

  delete(): void {
    this.updating = true;
    this.etudiantService.delete(this.etudiantToUpdate.idEtudiant).pipe(tap(() => {
      this.snackBar.open('L\'étudiant(e) ' + this.etudiantToUpdate.personne.nom.toUpperCase() + ' ' + this.etudiantToUpdate.personne.prenom + ' a bien été supprimé(e)', 'OK', {
        duration: 3000
      });
      this.updating = false;
      this.router.navigate(['accueil/gestion-formation']);
    })).subscribe();
  }
}
