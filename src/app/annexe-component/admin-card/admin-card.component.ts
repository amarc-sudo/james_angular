import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent implements OnInit {

  @Input()
  header: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
