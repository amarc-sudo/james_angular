import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private Auth: AuthService, private router: Router) {
    this.error = false;
  }

  // tslint:disable-next-line:typedef
  error: boolean;

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    console.log(password);
    this.Auth.getUserDetails(email, password).subscribe(data => {
      // @ts-ignore
      if (data){
        this.Auth.loggedIn(true, email);
        this.router.navigate(['admin']);
      } else {
        this.error = true;
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('email');
      }
    });
  }
}
