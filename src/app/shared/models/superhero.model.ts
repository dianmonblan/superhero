import { ModelAbstract } from './model-abstract';
import { SuperHeroPowerstatsModel } from './superhero-powerstats.model';
import { SuperHeroAppearanceModel } from './superhero-appearance.model';
import { SuperHeroBiographyModel } from './superhero-biography.model';
import { SuperHeroWorkModel } from './superhero-work.model';
import { SuperHeroConnectionsModel } from './superhero-connections.model';
import { SuperHeroImagesModel } from './superhero-images.model';

export class SuperHeroModel extends ModelAbstract<SuperHeroModel> {
    id: number;
    name: string;
    slug: string;
    powerstats: SuperHeroPowerstatsModel;
    appearance: SuperHeroAppearanceModel;
    biography: SuperHeroBiographyModel;
    work: SuperHeroWorkModel;
    connections: SuperHeroConnectionsModel;
    images: SuperHeroImagesModel;

    setData(data: SuperHeroModel): void {
        if (data) {
            Object.assign(this, data)

            if (data.powerstats)
                this.powerstats = new SuperHeroPowerstatsModel(data.powerstats)

            if (data.appearance)
                this.appearance = new SuperHeroAppearanceModel(data.appearance)

            if (data.biography)
                this.biography = new SuperHeroBiographyModel(data.biography)

            if (data.work)
                this.work = new SuperHeroWorkModel(data.work)

            if (data.connections)
                this.connections = new SuperHeroConnectionsModel(data.connections)

            if (data.images)
                this.images = new SuperHeroImagesModel(data.images)
        }
    }
}