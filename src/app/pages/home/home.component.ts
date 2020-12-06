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

  // tslint:disable-next-line:typedef
  change(s: string) {
    this.router.navigate([s]);
  }

  // tslint:disable-next-line:typedef
  logged(){
    return sessionStorage.getItem('loggedIn');
  }
}
