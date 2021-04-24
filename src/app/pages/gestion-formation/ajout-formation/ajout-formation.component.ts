import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Secretaire} from '../../../api/objects/Secretaire';
import {SecretaireService} from '../../../service/api/secretaire.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-ajout-formation',
  templateUrl: './ajout-formation.component.html',
  styleUrls: ['./ajout-formation.component.css']
})
export class AjoutFormationComponent implements OnInit {


  secretaire: Secretaire;

  @Output() resetView = new EventEmitter<number>();

  constructor(private secretaireService: SecretaireService) {

  }

  ngOnInit(): void {
    this.secretaireService.read(parseInt(sessionStorage.getItem('id'), 10)).pipe(tap(secretaire => this.secretaire = secretaire)).subscribe();
  }

}
