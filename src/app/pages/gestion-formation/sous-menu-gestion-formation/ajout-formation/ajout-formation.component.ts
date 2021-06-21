import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Secretaire} from '../../../../api/objects/Secretaire';
import {SecretaireService} from '../../../../service/api/secretaire.service';
import {switchMap, switchMapTo, tap} from 'rxjs/operators';
import {Professeur} from '../../../../api/objects/Professeur';
import {ProfesseurService} from '../../../../service/api/professeur.service';
import {FormationService} from '../../../../service/api/formation.service';
import {Etudiant} from '../../../../api/objects/Etudiant';
import {Formation} from '../../../../api/objects/Formation';
import {Personne} from '../../../../api/objects/Personne';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajout-formation',
  templateUrl: './ajout-formation.component.html',
  styleUrls: ['./ajout-formation.component.css']
})
export class AjoutFormationComponent implements OnInit {


  secretaire: Secretaire;

  listProfesseur: Professeur[] = [];

  updating = false;

  errorNom = false;

  @Output() resetView = new EventEmitter<number>();

  constructor(private secretaireService: SecretaireService,
              private professeurService: ProfesseurService,
              private formationService: FormationService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.secretaireService.read(parseInt(sessionStorage.getItem('id'), 10)).pipe(tap(secretaire => this.secretaire = secretaire)).subscribe();
    this.professeurService.list().pipe(tap(result => this.listProfesseur = result)).subscribe();
  }

  addFormation(): void {
    const formation: Formation = new Formation();
    const intitule = (document.getElementById('nom') as HTMLInputElement).value;
    if (intitule === '') {
      this.errorNom = true;
      return;
    }
    this.errorNom = false;
    formation.intitule = intitule;
    const professeurResponsable: Professeur = new Professeur();
    professeurResponsable.idProfesseur = parseInt((document.getElementById('professeur') as HTMLSelectElement).value, 10);
    formation.professeurResponsable = professeurResponsable;
    this.formationService.create(formation).pipe(
      tap(formationCreated => {
        this.secretaire.formations.push(formationCreated);
        const storedArray = JSON.parse(sessionStorage.getItem('formations'));
        storedArray.push(formationCreated);
        sessionStorage.setItem('formations', JSON.stringify(storedArray));

      }),
      switchMapTo(this.secretaireService.update(this.secretaire).pipe(
        tap(secretaire => this.secretaire = secretaire)))).subscribe(() => {
        this.snackBar.open('La formation ' + intitule + ' ' + ' a bien été ajoutée', 'OK', {
          duration: 3000
        });
        this.resetView.emit(0);
        (document.getElementById('nom') as HTMLInputElement).value = '';
      }
    );
  }


}



