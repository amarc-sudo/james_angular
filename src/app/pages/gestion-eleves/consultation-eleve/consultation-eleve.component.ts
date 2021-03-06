import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {Etudiant} from '../../../api/objects/Etudiant';
import {EtudiantService} from '../../../service/api/etudiant.service';

@Component({
  selector: 'app-consultation-eleve',
  templateUrl: './consultation-eleve.component.html',
  styleUrls: ['./consultation-eleve.component.css']
})
export class ConsultationEleveComponent implements OnInit {

  idEtudiant: number;

  etudiant$: Observable<Etudiant>;

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private etudiantService: EtudiantService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idEtudiant = params.idEtudiant;
    });

    if (this.idEtudiant !== undefined) {
      this.etudiant$ = this.etudiantService.read(this.idEtudiant);
    }
  }

  goToModification(etudiant: Etudiant): void {
    this.router.navigate(['accueil/gestion-formation/modification-eleve'], {queryParams: {idEtudiant: etudiant.idEtudiant}});
  }
}
