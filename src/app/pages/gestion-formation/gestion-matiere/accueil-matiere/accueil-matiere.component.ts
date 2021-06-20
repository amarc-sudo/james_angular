import {Component, OnInit, ViewChild} from '@angular/core';
import {VisualisationMatiereComponent} from '../visualisation-matiere/visualisation-matiere.component';

@Component({
  selector: 'app-accueil-matiere',
  templateUrl: './accueil-matiere.component.html',
  styleUrls: ['./accueil-matiere.component.css']
})
export class AccueilMatiereComponent implements OnInit {

  @ViewChild(VisualisationMatiereComponent) visualisation: VisualisationMatiereComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

  reloadComponent(): void {
    this.visualisation.ngOnInit();
  }
}
