import { ModelAbstract } from './model-abstract';

export class SuperHeroPowerstatsModel extends ModelAbstract<SuperHeroPowerstatsModel> {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
}