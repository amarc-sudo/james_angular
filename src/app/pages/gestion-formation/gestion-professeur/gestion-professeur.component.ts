import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {HttpClient} from '@angular/common/http';
import {Professeur} from '../../../api/objects/Professeur';
import {ProfesseurService} from '../../../service/api/professeur.service';
import {tap} from 'rxjs/operators';
import {DropEvent} from 'ng-drag-drop';

@Component({
  selector: 'app-gestion-professeur',
  templateUrl: './gestion-professeur.component.html',
  styleUrls: ['./gestion-professeur.component.css']
})
export class GestionProfesseurComponent implements OnInit {

  listFormations: Formation[] = [];

  listProfesseurInFormation: Professeur[];

  listProfesseurOutFormation: Professeur[];

  listProfesseur: Professeur[];

  listProfesseurAltered: Professeur[];

  idFormationSelected: number;

  nomFormationSelected: string;
  @Output() resetView = new EventEmitter<number>();

  updating = false;

  constructor(private professeurService: ProfesseurService) {
  }

  ngOnInit(): void {
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
    if (this.listFormations.length > 0) {
      this.professeurService.list().pipe(tap(result => {
        this.listProfesseur = result;
        this.listProfesseurAltered = result;
        this.idFormationSelected = this.listFormations[0].idFormation;
        this.nomFormationSelected = this.listFormations[0].intitule;
        this.listProfesseurInFormation = this.listProfesseur.filter(professeur => professeur.formations.map(formation => formation.idFormation).includes(this.idFormationSelected));
        this.listProfesseurOutFormation = this.listProfesseur.filter(professeur => !professeur.formations.map(formation => formation.idFormation).includes(this.idFormationSelected));

      })).subscribe();
    }

  }

  professeurInAdd($event: DropEvent): void {
    this.listProfesseurInFormation.push($event.dragData as Professeur);
    this.listProfesseurOutFormation = this.listProfesseurOutFormation.filter(professeur => professeur !== $event.dragData);
    for (let i = 0; i < this.listProfesseurAltered.length; i++) {
      if (this.listProfesseurAltered[i].idProfesseur == ($event.dragData as Professeur).idProfesseur) {
        this.listProfesseurAltered[i].formations.push({idFormation: this.idFormationSelected} as Formation);
      }
    }
  }

  professeurInRemove($event: DropEvent): void {
    this.listProfesseurOutFormation.push($event.dragData as Professeur);
    this.listProfesseurInFormation = this.listProfesseurInFormation.filter(professeur => professeur !== $event.dragData);
    for (let i = 0; i < this.listProfesseurAltered.length; i++) {
      if (this.listProfesseurAltered[i].idProfesseur == ($event.dragData as Professeur).idProfesseur) {
        this.listProfesseurAltered[i].formations = this.listProfesseurAltered[i].formations.filter(formation => formation.idFormation != this.idFormationSelected);
      }
    }
  }

  updateProfesseur(): void {
    this.updating = false;
    this.professeurService.updateList(this.listProfesseurAltered).pipe(tap(() => this.resetView.emit(0))).subscribe();
  }

  changeFormation($event: Event): void {
    this.idFormationSelected = parseInt(($event.target as HTMLSelectElement).value, 10);
    this.listProfesseurAltered = this.listProfesseur;
    this.listProfesseurInFormation = this.listProfesseur.filter(professeur => professeur.formations.map(formation => formation.idFormation).includes(this.idFormationSelected));
    this.listProfesseurOutFormation = this.listProfesseur.filter(professeur => !professeur.formations.map(formation => formation.idFormation).includes(this.idFormationSelected));
    this.nomFormationSelected = (this.listFormations.filter(formation => formation.idFormation == this.idFormationSelected))[0].intitule;
  }
}
