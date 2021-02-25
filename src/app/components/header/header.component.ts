import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  logged(): any {
    return sessionStorage.getItem('loggedIn');
  }

  disconnect(): void {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.router.navigate(['']);
  }

}
