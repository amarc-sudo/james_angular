import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {Formation} from '../../../api/objects/Formation';

@Component({
  selector: 'app-accueil-gestion-formation',
  templateUrl: './accueil-gestion-formation.component.html',
  styleUrls: ['./accueil-gestion-formation.component.css']
})
export class AccueilGestionFormationComponent implements OnInit {

  switchView = 0;

  poste: string;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.poste = sessionStorage.getItem('poste');
  }

  change(s: string): void {
    this.router.navigate([s]);
    this.router.events
      .pipe(
        filter(value => value instanceof NavigationEnd),
      )
      .subscribe(event => {
        if (event.toString() === 'http://mypreviousUrl.com') {
          window.location.reload();
        }
      });
  }

  changeView(switchView: number): void {
    this.switchView = switchView;
  }
}
