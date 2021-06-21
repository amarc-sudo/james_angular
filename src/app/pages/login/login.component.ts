import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/api/auth.service';
import {NgForm} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {tap} from 'rxjs/operators';
import {TokenConnexionService} from '../../service/api/token-connexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


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
    this.Auth.getUserDetails(email, password).pipe(tap(data => {
      if (data != null) {
        if (data[0] === 'secretaire') {
          this.Auth.loggedIn(true, email, data[1]['idSecretaire'], data[1]['formations'], data[1]['personne'], 'sec');
        } else if (data[0] === 'professeur') {
          this.Auth.loggedIn(true, email, data[2].idProfesseur, data[1], data[2].personne, 'prof');
        }
        this.tokenConnexionService.generateToken(email).pipe(tap(result => {
          sessionStorage.setItem('token', result.token);
          sessionStorage.setItem('responsable', 'true');
          this.router.navigate(['accueil']);
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
