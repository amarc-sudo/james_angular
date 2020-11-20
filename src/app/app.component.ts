import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'James';
  constructor(private router: Router) {
   /* if (sessionStorage.getItem("loggedIn")){
      this.router.navigate(['admin']);
      // tslint:disable-next-line:align
    }
    console.log(this.router.url);
    if (this.router.url !== 'reset'){
      this.router.navigate(['login']);
    }*/
  }
}
