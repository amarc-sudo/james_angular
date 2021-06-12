import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Formation} from '../../../api/objects/Formation';
import {Etudiant} from '../../../api/objects/Etudiant';
import {EtudiantService} from '../../../service/api/etudiant.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visualisation-formation',
  templateUrl: './visualisation-formation.component.html',
  styleUrls: ['./visualisation-formation.component.css']
})
export class VisualisationFormationComponent implements OnInit {


  @Output() resetView = new EventEmitter<number>();

  listFormations: Formation[] = [];

  etudiantListComplete: Etudiant[] = [];

  etudiantListFiltered: Etudiant[] = [];

  constructor(private etudiantService: EtudiantService, private router: Router) {

  }

  ngOnInit(): void {
    const storedArray = JSON.parse(sessionStorage.getItem('formations'));
    for (let i = 0; i < storedArray.length; i++) {
      this.listFormations.push(storedArray[i] as Formation);
    }
    this.etudiantService.listByFormation(this.listFormations).pipe(tap(result => {
        this.etudiantListComplete = result;
        this.etudiantListFiltered = this.etudiantListComplete
          .filter(etudiant => etudiant.formation.idFormation === this.listFormations[0].idFormation);
      }
    )).subscribe();
  }

  onChange(value: any): void {
    this.etudiantListFiltered = this.etudiantListComplete
      .filter(etudiant => etudiant.formation.idFormation == value);
  }

  goToEtudiant(etudiant: Etudiant): void {
    this.router.navigate(['/accueil/gestion-eleve/consultation'], {queryParams: {idEtudiant: etudiant.idEtudiant}});
  }
}
