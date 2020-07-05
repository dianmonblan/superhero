import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, filter, retry } from 'rxjs/operators';

import { SUPERHERO } from '../../../environments/environment';
import { SuperHeroModel } from '../models/superhero.model';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';

export const NUMBER_SUPERHEROES_FOR_LIST: number = 20
const SUPERHEROE_KEY = makeStateKey('superHeroe');
const SUPERHEROES_KEY = makeStateKey('superHeroes');
const SUPERHEROES_RANDOM_IDS_KEY = makeStateKey('superHeroesIds');

@Injectable({ providedIn: 'root' })
export class SuperHeroService {
    private _superHeroesIds: number[] = []
    private _superHero: SuperHeroModel = null
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
            let superHero: SuperHeroModel = new SuperHeroModel()
            superHero.setData(this._transferState.get<SuperHeroModel>(SUPERHEROE_KEY, null))
            this._superHero = superHero;
            this._superHeroes = this._map(this._transferState.get<SuperHeroModel[]>(SUPERHEROES_KEY, []));
            this._superHeroesIds = this._transferState.get<number[]>(SUPERHEROES_RANDOM_IDS_KEY, [])
        }
    }

    private existsSuperHeroe(): boolean {
        return this._superHero && this._superHero.id ? true : false
    }

    private existsSuperHeroes(): boolean {
        return !!this._superHeroes.length
    }

    private _map(superHeroes: SuperHeroModel[]): SuperHeroModel[] {
        return superHeroes.map((_superHero: SuperHeroModel) => {
            let superHero: SuperHeroModel = new SuperHeroModel()
            superHero.setData(_superHero)
            return superHero
        })
    }

    /** 
     * Recomendación de hacer uso de una función recursiva para
     * optimizar la busqueda y refactorizar el código.
     */
    private _filter(filter: string): SuperHeroModel[] {
        filter = filter.toString().toUpperCase()

        return this._superHeroes.filter((superHero: SuperHeroModel) =>
            superHero.id.toString().toUpperCase().includes(filter)
            || superHero.name.toString().toUpperCase().includes(filter)
            || superHero.biography.fullName.toString().toUpperCase().includes(filter)
        )
    }

    private _random(length: number): SuperHeroModel[] {
        let superHeroes: SuperHeroModel[] = []
        length = this._superHeroes.length < length ? this._superHeroes.length : length

        if (!this._superHeroesIds.length) {
            while (superHeroes.length < length) {
                let randomNumber: number = Math.floor(Math.random() * this._superHeroes.length)

                if (!this._superHeroesIds.includes(randomNumber)) {
                    this._superHeroesIds.push(randomNumber)
                    superHeroes.push(this._superHeroes[randomNumber])
                }
            }

            if (isPlatformServer(this._platform))
                this._transferState.set<number[]>(SUPERHEROES_RANDOM_IDS_KEY, this._superHeroesIds)
        } else
            this._superHeroesIds.forEach((id: number) => superHeroes.push(this._superHeroes[id]))

        return superHeroes
    }

    list(filter: string = null, random: boolean = true, length: number = NUMBER_SUPERHEROES_FOR_LIST): Observable<SuperHeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes).pipe(
                map((superHeroes: SuperHeroModel[]) => {
                    superHeroes = filter ? this._filter(filter) : superHeroes
                    return superHeroes
                }),
                map((superHeroes: SuperHeroModel[]) => random ? this._random(length) : superHeroes.slice(0, length))
            )

        return this._httpClient.get<SuperHeroModel[]>((<{ [key: string]: string }>SUPERHERO.RESOURCE).LIST)
            .pipe(
                retry(3),
                map((superHeroes: SuperHeroModel[]) => this._map(superHeroes)),
                tap((superHeroes: SuperHeroModel[]) => this._superHeroes = superHeroes),
                tap((superHeroes: SuperHeroModel[]) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<SuperHeroModel[]>(SUPERHEROES_KEY, superHeroes)
                }),
                map((superHeroes: SuperHeroModel[]) => {
                    superHeroes = filter ? this._filter(filter) : superHeroes
                    return superHeroes
                }),
                map((superHeroes: SuperHeroModel[]) => random ? this._random(length) : superHeroes.slice(0, length))
            )
    }

    detail(id: number): Observable<SuperHeroModel> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes.find((superHero: SuperHeroModel) => superHero.id == id))
        else if (this.existsSuperHeroe())
            return of(this._superHero).pipe(
                filter((superHero: SuperHeroModel) => this._superHero.id == id)
            )

        const RESOURCE: string = (<{ [key: string]: string }>SUPERHERO.RESOURCE).ID.replace('#{ID}', id.toString())
        return this._httpClient.get<SuperHeroModel>(RESOURCE)
            .pipe(
                retry(3),
                map((_superHero: SuperHeroModel) => {
                    let superHero = new SuperHeroModel()
                    superHero.setData(_superHero)
                    return superHero
                }),
                tap((superHero: SuperHeroModel) => this._superHero = superHero),
                tap((superHero: SuperHeroModel) => {
                    if (isPlatformServer(this._platform))
                        this._transferState.set<SuperHeroModel>(SUPERHEROE_KEY, superHero)
                })
            )
    }
}