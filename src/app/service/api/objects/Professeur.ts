import {Formation} from './Formation';
import {Personne} from './Personne';
import {Contact} from './Contact';

export class Professeur{
  idProfesseur: number;
  personne: Personne;
  contact: Contact;
  formations: Formation[];
  hasSigned: boolean;
}
