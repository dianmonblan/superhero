import { ModelAbstract } from './model-abstract';

export class SuperHeroImagesModel extends ModelAbstract<SuperHeroImagesModel> {
    xs: string;
    sm: string;
    md: string;
    lg: string;

    setData(data: SuperHeroImagesModel): void {
        if (data)
            Object.assign(this, data)
    }
}