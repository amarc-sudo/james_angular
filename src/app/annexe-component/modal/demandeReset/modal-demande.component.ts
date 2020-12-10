import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../service/auth/auth.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-demande',
  templateUrl: './modal-demande.component.html',
  styleUrls: ['./modal-demande.component.css']
})
export class ModalDemandeComponent implements OnInit {

  constructor(private Auth: AuthService, private router: Router, private modalService: NgbModal) {
    this.loading = false;
    this.error = false;
  }

  loading: boolean;
  error: boolean;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  sendReset(form: NgForm) {
    const email = form.value.email;
    this.loading = true;
    this.Auth.resetPassword(email).subscribe(data => {
      if (data) {
        this.error = false;
        this.loading = false;
        this.modalService.dismissAll();
      } else {
        this.loading = false;
        this.error = true;
      }

    });
  }

  // tslint:disable-next-line:typedef
  getModalService() {
    return this.modalService;
  }
}
