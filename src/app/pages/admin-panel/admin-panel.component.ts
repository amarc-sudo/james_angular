import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  headerCard: string;


  constructor() {
    this.headerCard = 'coucou';
  }

  ngOnInit(): void {
  }
  changeCard(card: string): void{
    this.headerCard = card;
  }

}
