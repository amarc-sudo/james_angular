import {Component, OnInit} from '@angular/core';
import {Formation} from '../../../../api/objects/Formation';
import {Matiere} from '../../../../api/objects/Matiere';
import {MatiereService} from '../../../../service/api/matiere.service';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-visualisation-matiere',
  templateUrl: './visualisation-matiere.component.html',
  styleUrls: ['./visualisation-matiere.component.css']
})
export class VisualisationMatiereComponent implements OnInit {

  listFormations: Formation[] = [];
  matiereListComplete: Matiere[] = [];
  matiereListFiltered: Matiere[] = [];

  constructor(private matiereService: MatiereService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
    this.matiereService.listByListFormation(this.listFormations).pipe(tap(list => {
      this.matiereListComplete = list;
      this.onChange(this.listFormations[0].idFormation);
    })).subscribe();
  }

  onChange(value: any): void {
    this.matiereListFiltered = this.matiereListComplete
      .filter(matiere => matiere.formation.idFormation == value);
  }

  deleteMatiere(matiere: Matiere): void {
    this.matiereService.delete(matiere).pipe(tap(() => {
      this.snackBar.open('La matière ' + matiere.intitule + ' a été supprimée', 'OK', {
        duration: 3000
      });
      this.matiereListComplete = this.matiereListComplete.filter(mat => mat.idMatiere != matiere.idMatiere);
      this.onChange(matiere.formation.idFormation);
    })).subscribe();
  }
}
