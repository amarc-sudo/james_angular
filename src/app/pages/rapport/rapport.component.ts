import { Component, OnInit } from '@angular/core';
import {host} from '@angular-devkit/build-angular/src/test-utils';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css'],
  host:{'style':'width:100%;height:100%'}
})
export class RapportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
