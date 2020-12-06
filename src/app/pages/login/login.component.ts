import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth/auth.service';
import {NgForm} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private Auth: AuthService, private router: Router, private modalService: NgbModal) {
    this.error = false;
    this.loading = false;
  }

  // tslint:disable-next-line:typedef
  error: boolean;
  loading: boolean;

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.Auth.getUserDetails(email, password).subscribe(data => {
      // @ts-ignore
      if (data != null){
        // tslint:disable-next-line:triple-equals
        if (data[0] == 'secretaire'){
          this.Auth.loggedIn(true, email, data[1]['idSecretaire'], data[1]['formations'], data[1]['personne'], 'sec');
        }
        // tslint:disable-next-line:triple-equals
        else if (data[0] == 'professeur') {
          this.Auth.loggedIn(true, email, data[2]['idProfesseur'], data[1], data[2]['personne'], 'prof');
        }
        this.router.navigate(['admin']);
      } else {
        this.error = true;
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('email');
      }
    });
  }

  // tslint:disable-next-line:typedef
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  // tslint:disable-next-line:typedef
  sendReset(form: NgForm){
    const email = form.value.email;
    this.loading = true;
    this.Auth.resetPassword(email).subscribe(data => {
      if(data){
        this.loading = false;
        this.modalService.dismissAll();
      }
      else{
        this.loading = false;
      }

    });
  }

}
