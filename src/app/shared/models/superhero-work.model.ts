import { ModelAbstract } from './model-abstract';

export class SuperHeroWorkModel extends ModelAbstract<SuperHeroWorkModel> {
    occupation: string;
    base: string;

    setData(data: SuperHeroWorkModel): void {
        if (data)
            Object.assign(this, data)
    }
}