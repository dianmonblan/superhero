import { ModelAbstract } from './model-abstract';

export class SuperHeroAppearance extends ModelAbstract {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
}