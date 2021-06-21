import {Time} from '@angular/common';
import {Matiere} from './Matiere';
import {Professeur} from './Professeur';
import {TableData} from './TableData';
import {Presence} from './Presence';
import {Personne} from './Personne';

export class Cours{
  idCours: number;
  matiere: Matiere;
  date: Date;
  begin: string;
  end: string;
  professeur: Professeur;
  etat: TableData;
  presences: Presence[];
  lastModifDate: Date;
  lastModifId: Personne;
}
