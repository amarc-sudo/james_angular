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
  }


  change(s: string): void {
    this.router.navigate([s]);
  }


  logged(): any{
    return sessionStorage.getItem('loggedIn');
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
}
