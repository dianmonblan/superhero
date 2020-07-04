import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { SUPERHERO } from '../../../environments/environment';
import { SuperHeroModel } from '../models/superhero.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

const SUPERHEROE_KEY = makeStateKey('superHeroe');
const SUPERHEROES_KEY = makeStateKey('superHeroes');
const SUPERHEROES_RANDOM_IDS_KEY = makeStateKey('superHeroesIds');

@Injectable({ providedIn: 'root' })
export class SuperHeroService {
    private _superHeroe: SuperHeroModel
    private _superHeroes: SuperHeroModel[] = []

    constructor(
        private _httpClient: HttpClient,
        private _transferState: TransferState,
        @Inject(PLATFORM_ID) private _platform: Object
    ) {
        this.readTransferState()
    }

    private readTransferState(): void {
        if (isPlatformBrowser(this._platform)) {
            this._superHeroe = new SuperHeroModel(this._transferState.get<SuperHeroModel>(SUPERHEROE_KEY, null));
            this._superHeroes = this._map(this._transferState.get<SuperHeroModel[]>(SUPERHEROES_KEY, []));
        }
    }

    private existsSuperHeroes(): boolean {
        return !!this._superHeroes.length
    }

    private _map(superHeroes: SuperHeroModel[]): SuperHeroModel[] {
        return superHeroes.map((superHero: SuperHeroModel) => new SuperHeroModel(superHero))
    }

    /** 
     * Recomendación de hacer uso de una función recursiva para
     * optimizar la busqueda y refactorizar el código.
     */
    private _filter(filter: string): SuperHeroModel[] {
        return this._superHeroes.filter((superHero: SuperHeroModel) =>
            superHero.name.includes(filter)
            || superHero.slug.includes(filter)
            || superHero.appearance.gender.includes(filter)
            || superHero.appearance.race.includes(filter)
            || superHero.appearance.eyeColor.includes(filter)
            || superHero.biography.fullName.includes(filter)
            || superHero.biography.alterEgos.includes(filter)
            || superHero.biography.placeOfBirth.includes(filter)
            || superHero.biography.firstAppearance.includes(filter)
            || superHero.biography.publisher.includes(filter)
            || superHero.biography.alignment.includes(filter)
            || superHero.work.occupation.includes(filter)
            || superHero.work.base.includes(filter)
            || superHero.connections.relatives.includes(filter)
        )
    }

    private _random(length: number): SuperHeroModel[] {
        let superHeroes: SuperHeroModel[] = []
        let superHeroesIds: number[] = this._transferState.get<number[]>(SUPERHEROES_RANDOM_IDS_KEY, [])

        if (!superHeroesIds.length) {
            while (superHeroes.length < length) {
                let randomNumber: number = Math.floor(Math.random() * this._superHeroes.length)

                if (!superHeroesIds.includes(randomNumber)) {
                    superHeroesIds.push(randomNumber)
                    superHeroes.push(this._superHeroes[randomNumber])
                }
            }

            if (isPlatformServer(this._platform))
                this._transferState.set<number[]>(SUPERHEROES_RANDOM_IDS_KEY, superHeroesIds)
        } else
            superHeroesIds.forEach((id: number) => superHeroes.push(this._superHeroes[id]))

        return superHeroes
    }

    list(): Observable<SuperHeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes)

        return this._httpClient.get<SuperHeroModel[]>(SUPERHERO.RESOURCE.LIST)
            .pipe(
                map((superHeroes: SuperHeroModel[]) => this._map(superHeroes)),
                tap((superHeroes: SuperHeroModel[]) => this._superHeroes = superHeroes),
                tap((superHeroes: SuperHeroModel[]) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<SuperHeroModel[]>(SUPERHEROES_KEY, this._superHeroes)
                }),
            )
    }

    id(id: number): Observable<SuperHeroModel> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes.find((superHero: SuperHeroModel) => superHero.id == id))
        else if (this._superHeroe)
            return of(this._superHeroe).pipe(
                filter((superHero: SuperHeroModel) => this._superHeroe.id == id)
            )

        const RESOURCE: string = SUPERHERO.RESOURCE.ID.replace('#{ID}', id.toString())

        return this._httpClient.get<SuperHeroModel>(RESOURCE)
            .pipe(
                map((superHero: SuperHeroModel) => new SuperHeroModel(superHero)),
                tap((superHeroe: SuperHeroModel) => this._superHeroe = superHeroe),
                tap((superHeroe: SuperHeroModel) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<SuperHeroModel>(SUPERHEROE_KEY, this._superHeroe)
                })
            )
    }

    search(filter: string): Observable<SuperHeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._filter(filter))

        return this.list().pipe(
            map((superHeroes: SuperHeroModel[]) => this._filter(filter)),
        )
    }

    random(length: number): Observable<SuperHeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._random(length))

        return this.list().pipe(
            map((superHeroes: SuperHeroModel[]) => this._random(length)),
        )
    }
}