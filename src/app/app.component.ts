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
  path: string[];


  constructor(private router: Router) {

  }
  faBars = faBars;

  logged(): any{
    return sessionStorage.getItem('loggedIn');
  }
  getCurrentRoute(): any {
    this.path = this.router.url.split('/');
    this.path.shift();
    return this.path;
  }

  getRouteUrl(index: number): string {
    const pathTab = this.path.splice(0, index + 1);
    // tslint:disable-next-line:only-arrow-functions
    let finalPath = '';
    pathTab.forEach(function(value) {
      finalPath += '/' + value;
    });
    return finalPath;
  }

  changeRoute(route: string): void{
    this.router.navigate([route]);
  }

  disconnect(): void {
    sessionStorage.removeItem('loggedIn');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.changeRoute('');
  }

  formatingNavtext(navtext: string): string{
    if(navtext.indexOf('?') == -1){
      return navtext;
    }
    else{
      return navtext.slice(0, navtext.indexOf('?'));
    }
  }

  isAcceptedCookie(): string {
    return localStorage.getItem('cookieStatus');
  }

  acceptedCookie(): void {
    localStorage.setItem('cookieStatus', 'true');
  }
}
