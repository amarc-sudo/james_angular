import {Time} from '@angular/common';
import {Matiere} from './Matiere';
import {Professeur} from './Professeur';
import {TableData} from './TableData';
import {Presence} from './Presence';

export class Cours{
  idCours: number;
  matiere: Matiere;
  date: Date;
  begin: Time;
  end: Time;
  professeur: Professeur;
  etat: TableData;
  presences: Presence[];
}
