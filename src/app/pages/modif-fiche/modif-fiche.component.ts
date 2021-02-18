import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cours} from '../../api/objects/Cours';
import {CoursService} from '../../service/api/cours.service';
import {PresenceService} from '../../service/api/presence.service';
import {Observable} from 'rxjs';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-modif-fiche',
  templateUrl: './modif-fiche.component.html',
  styleUrls: ['./modif-fiche.component.css']
})
export class ModifFicheComponent implements OnInit {


  idCours: number;

  cours$: Observable<Cours>;

  setModifPresences = new Set<string>();

  constructor(private route: ActivatedRoute, private coursService: CoursService, private presenceService: PresenceService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idCours = params['idCours'];
    });
    if (this.idCours != null) {
      this.cours$ = this.coursService.read(this.idCours);
    }
  }

  addChangementPresences(idPresence: string): void {
    this.setModifPresences.add(idPresence);
  }

  enregistrer(cours: Cours): void {
    let map = new Map();
    this.setModifPresences.forEach(idPresence => {
      const select = (document.getElementById(idPresence)) as HTMLSelectElement;
      const indice = select.selectedIndex;
      const options = select.options[indice];
      map.set(idPresence, options.value);
    });
    this.presenceService.update(map).subscribe();
    const date = new Date(cours.date);
    date.setTime(date.getTime() + 1000 * 60 * 60);
    this.router.navigate(['admin/gestion-abs/fiche-presence'], {
      queryParams: {
        id: cours.matiere.formation.idFormation,
        date: date.toISOString().substring(0, 10)
      }
    });
  }


}
