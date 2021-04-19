import {Personne} from './Personne';
import {Contact} from './Contact';
import {Formation} from './Formation';


export class Secretaire{
  idSecretaire: number;
  personne: Personne;
  contact: Contact;
  formations: Formation[];
}
