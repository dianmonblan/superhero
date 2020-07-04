import { SuperHeroPowerstats } from './superhero-powerstats.model';
import { SuperHeroAppearance } from './superhero-appearance.model';
import { SuperHeroBiography } from './superhero-biography.model';
import { SuperHeroWork } from './superhero-work.model';
import { SuperHeroConnections } from './superhero-connections.model';
import { ModelAbstract } from './model-abstract';
import { SuperHeroImages } from './superhero-images.model';

export class SuperHero extends ModelAbstract {
    id: number;
    name: string;
    slug: string;
    powerstats: SuperHeroPowerstats;
    appearance: SuperHeroAppearance;
    biography: SuperHeroBiography;
    work: SuperHeroWork;
    connections: SuperHeroConnections;
    images: SuperHeroImages;
}