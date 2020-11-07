import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    const email = form.value['email'];
    const password = form.value['password'];

    this.Auth.getUserDetails(email, password).subscribe(data => {
      // @ts-ignore
      if (data){
        window.alert('bon');
      } else {
        window.alert('pas bon');
      }
    });
  }
}
