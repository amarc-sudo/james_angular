import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sous-menu-gestion-professeur',
  templateUrl: './sous-menu-gestion-professeur.component.html',
  styleUrls: ['./sous-menu-gestion-professeur.component.css']
})
export class SousMenuGestionProfesseurComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}
