import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('HomeComponent');
  }


  change(s: string): void {
    this.router.navigate([s]);
  }


  logged(): any{
    return sessionStorage.getItem('loggedIn') === 'true';
  }

  get responsableLogged(): boolean {
    return sessionStorage.getItem('role') === 'responsable';
  }

  isLogged(): boolean{
    if (sessionStorage.getItem('tokenLogin') !== null){
      return true;
    }
    return false;
  }

  goToSite(s: string): void {
    document.location.href = s;
  }
  disconnect(): void {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
  }

}
