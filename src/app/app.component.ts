import { Component } from '@angular/core';
import {Router} from '@angular/router';
import Popper from 'popper.js';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'James';
  constructor(private router: Router) {
  }
  faBars = faBars;

  logged(): any{
    return sessionStorage.getItem('loggedIn');
  }
}
