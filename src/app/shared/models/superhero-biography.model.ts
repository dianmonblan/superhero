import { ModelAbstract } from './model-abstract';

export class SuperHeroBiographyModel extends ModelAbstract<SuperHeroBiographyModel> {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
}