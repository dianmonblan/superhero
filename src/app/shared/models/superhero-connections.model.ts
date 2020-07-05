import { ModelAbstract } from './model-abstract';

export class SuperHeroConnectionsModel extends ModelAbstract<SuperHeroConnectionsModel> {
    groupAffiliation: string;
    relatives: string;
}