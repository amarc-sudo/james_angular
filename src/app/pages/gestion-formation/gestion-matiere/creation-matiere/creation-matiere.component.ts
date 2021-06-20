import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../../api/objects/Formation';
import {Etudiant} from '../../../../api/objects/Etudiant';
import {Personne} from '../../../../api/objects/Personne';
import {switchMapTo, tap} from 'rxjs/operators';
import {Matiere} from '../../../../api/objects/Matiere';
import {MatiereService} from '../../../../service/api/matiere.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-matiere',
  templateUrl: './creation-matiere.component.html',
  styleUrls: ['./creation-matiere.component.css']
})
export class CreationMatiereComponent implements OnInit {

  listFormations: Formation[] = [];
  errorIntitule = false;
  updating = false;

  @Output() resetView = new EventEmitter<number>();

  constructor(private matiereService: MatiereService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
  }

  addMatiere(): void {
    const matiere: Matiere = new Matiere();
    const formation: Formation = new Formation();
    formation.idFormation = parseInt((document.getElementById('formation') as HTMLSelectElement).value, 10);
    matiere.formation = formation;
    this.errorIntitule = false;
    if ((document.getElementById('intitule') as HTMLInputElement).value === '') {
      this.errorIntitule = true;
      return;
    }
    matiere.intitule = (document.getElementById('intitule') as HTMLInputElement).value;
    this.matiereService.create(matiere).pipe(tap(matiere => {
        this.snackBar.open('La matière ' + matiere.intitule + ' a bien été ajoutée', 'OK', {
          duration: 3000
        });
        (document.getElementById('intitule') as HTMLInputElement).value = '';
        this.updating = false;
        this.resetView.emit(0);
      }
    )).subscribe();

  }

}
