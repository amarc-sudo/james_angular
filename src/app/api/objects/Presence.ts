import {TableData} from './TableData';
import {Etudiant} from './Etudiant';
import {Cours} from './Cours';

export class Presence{
  idPresence: number;
  etudiant: Etudiant;
  cours: Cours;
  etatPresence: TableData;
}
