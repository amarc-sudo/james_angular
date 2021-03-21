import { Component, OnInit } from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-accueil-gestion-formation',
  templateUrl: './accueil-gestion-formation.component.html',
  styleUrls: ['./accueil-gestion-formation.component.css']
})
export class AccueilGestionFormationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
