import {Formation} from './Formation';
import {Personne} from './Personne';

export class Etudiant {
  idEtudiant: number;
  personne: Personne;
  formation: Formation;
  groupe: number;
  nombreAbsences: number;
  nombreRetards: number;
  hasSigned: boolean;
  adresseMail: string;
}
