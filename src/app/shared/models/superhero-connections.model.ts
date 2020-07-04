import { ModelAbstract } from './model-abstract';

export class SuperHeroConnectionsModel extends ModelAbstract<SuperHeroConnectionsModel> {
    groupAffiliation: string;
    relatives: string;

    setData(data: SuperHeroConnectionsModel): void {
        if (data)
            Object.assign(this, data)
    }
}