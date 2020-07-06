import { ModelAbstract } from './model-abstract';

const IMAGE_WIDTH_XS: number = 32
const IMAGE_WIDTH_SM: number = 160
const IMAGE_WIDTH_MD: number = 218
const IMAGE_WIDTH_LG: number = 245

export class SuperHeroImagesModel extends ModelAbstract<SuperHeroImagesModel> {
    xs: string;
    sm: string;
    md: string;
    lg: string;

    lazySizes(): string {
        return [
            `${this.xs} ${IMAGE_WIDTH_XS}w`,
            `${this.sm} ${IMAGE_WIDTH_SM}w`,
            `${this.md} ${IMAGE_WIDTH_MD}w`,
            `${this.lg} ${IMAGE_WIDTH_LG}w`
        ].join(',')
    }
}