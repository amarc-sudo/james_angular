import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  private prenom: string;
  private nom: string;

  constructor(private router: Router) {
    this.prenom = sessionStorage.getItem('prenom');
    this.nom = sessionStorage.getItem('nom');
  }

  ngOnInit(): void {
  }

  getPrenom(): string {
    console.log(sessionStorage.getItem('formations'));
    return this.prenom + " " + this.nom;
  }

  // tslint:disable-next-line:typedef
  change(s: string) {
    this.router.navigate([s]);
  }

}
