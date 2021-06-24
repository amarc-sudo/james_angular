import {Time} from '@angular/common';
import {Matiere} from './Matiere';
import {Professeur} from './Professeur';
import {TableData} from './TableData';
import {Presence} from './Presence';
import {Personne} from './Personne';

export class Log {
  dateHeure: Time;
  type: string;
  commentaire: string;
  ip: string;
  id: number;
}
