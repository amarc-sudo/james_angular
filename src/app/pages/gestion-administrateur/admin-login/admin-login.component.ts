import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/api/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenConnexionService} from '../../../service/api/token-connexion.service';
import {NgForm} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  constructor(private Auth: AuthService, private router: Router, private modalService: NgbModal, private tokenConnexionService: TokenConnexionService) {
    this.error = false;
    this.loading = false;
  }


  error: boolean;
  loading: boolean;

  ngOnInit(): void {
    if (this.logged()) {
      this.router.navigate(['accueil']);
    }
  }

  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    this.Auth.getUserDetailsAdmin(email, password).pipe(tap(data => {
      if (data != null) {
         this.Auth.loggedInAdmin(true, email, 'admin');

         this.tokenConnexionService.generateTokenAdmin(email).pipe(tap(result => {
          sessionStorage.setItem('token', result.token);
          this.router.navigate(['admin-panel']);
        })).subscribe();

      } else {
        this.error = true;
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('email');
      }
    })).subscribe();
  }


  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  sendReset(form: NgForm): void {
    const email = form.value.email;
    this.loading = true;
    this.Auth.resetPassword(email).subscribe(data => {
      if (data) {
        this.loading = false;
        this.modalService.dismissAll();
      } else {
        this.loading = false;
      }

    });
  }

  logged(): any {
    return sessionStorage.getItem('loggedIn');
  }

}
