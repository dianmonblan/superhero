import { ModelAbstract } from './model-abstract';
import { SuperHeroPowerstatsModel } from './superhero-powerstats.model';
import { SuperHeroAppearanceModel } from './superhero-appearance.model';
import { SuperHeroBiographyModel } from './superhero-biography.model';
import { SuperHeroWorkModel } from './superhero-work.model';
import { SuperHeroConnectionsModel } from './superhero-connections.model';
import { SuperHeroImagesModel } from './superhero-images.model';
import { PositioningSEO } from './interfaces';

export class SuperHeroModel extends ModelAbstract<SuperHeroModel> implements PositioningSEO {
    id: number;
    name: string;
    slug: string;
    powerstats: SuperHeroPowerstatsModel = new SuperHeroPowerstatsModel();
    appearance: SuperHeroAppearanceModel = new SuperHeroAppearanceModel();
    biography: SuperHeroBiographyModel = new SuperHeroBiographyModel();
    work: SuperHeroWorkModel = new SuperHeroWorkModel();
    connections: SuperHeroConnectionsModel = new SuperHeroConnectionsModel();
    images: SuperHeroImagesModel = new SuperHeroImagesModel();

    get titleSEO(): string {
        return this.name.toUpperCase()
    };
    get descriptionSEO(): string {
        return this.work.occupation
    };
    get keywordsSEO(): string {
        return [
            this.name,
            this.slug,
            this.appearance.gender,
            this.appearance.race,
            this.appearance.eyeColor,
            this.appearance.hairColor,
            this.biography.publisher,
            this.biography.alignment,
        ].join(',')
    };

    imagesLazySizes(): string {
        return this.images.lazySizes()
    }

    setData(data: SuperHeroModel): void {
        if (data) {
            super.setData(data)

            if (data.powerstats) {
                let powerstats = new SuperHeroPowerstatsModel()
                powerstats.setData(data.powerstats)
                this.powerstats = powerstats
            }

            if (data.appearance) {
                let appearance = new SuperHeroAppearanceModel()
                appearance.setData(data.appearance)
                this.appearance = appearance
            }

            if (data.biography) {
                let biography = new SuperHeroBiographyModel()
                biography.setData(data.biography)
                this.biography = biography
            }

            if (data.work) {
                let work = new SuperHeroWorkModel()
                work.setData(data.work)
                this.work = work
            }

            if (data.connections) {
                let connections = new SuperHeroConnectionsModel()
                connections.setData(data.connections)
                this.connections = connections
            }

            if (data.images) {
                let images = new SuperHeroImagesModel()
                images.setData(data.images)
                this.images = images
            }
        }
    }
}