import { ModelAbstract } from './model-abstract';

export class SuperHeroBiography extends ModelAbstract {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}