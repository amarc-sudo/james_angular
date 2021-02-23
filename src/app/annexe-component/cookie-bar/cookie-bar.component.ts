import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-bar',
  templateUrl: './cookie-bar.component.html',
  styleUrls: ['./cookie-bar.component.css']
})
export class CookieBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isAcceptedCookie(): string {
    return localStorage.getItem('cookieStatus');
  }

  acceptedCookie(): void {
    localStorage.setItem('cookieStatus', 'true');
  }
}
