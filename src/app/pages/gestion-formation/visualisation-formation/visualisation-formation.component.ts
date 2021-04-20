import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-visualisation-formation',
  templateUrl: './visualisation-formation.component.html',
  styleUrls: ['./visualisation-formation.component.css']
})
export class VisualisationFormationComponent implements OnInit {

  @Output() resetView = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

}
