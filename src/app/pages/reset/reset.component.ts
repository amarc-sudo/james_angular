import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/api/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  token: string;
  error: boolean;
  constructor(private route: ActivatedRoute, private auth: AuthService, private router: Router) {
    this.error = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.auth.correctToken(this.token).subscribe(result => {
        if (result === false){
          this.router.navigate(['login']);
        }
      });
    });
  }

  onSubmit(form: NgForm): void{
    const passwordFirst = form.value.passwordFirst;
    const passwordVerif = form.value.passwordVerif;
    if (passwordFirst === passwordVerif) {
      this.auth.changePassword(passwordVerif, this.token).subscribe();
      this.router.navigate(['login']);
      this.error = false;
    }
    else{
      this.error = true;
    }
  }

}
