import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SUPERHERO } from '../../../environments/environment';
import { SuperHeroModel } from '../models/superhero.model';

@Injectable({ providedIn: 'root' })
export class SuperHeroService {
    private _superHeroes: SuperHeroModel[] = []

    constructor(private _httpClient: HttpClient) { }

    private existsSuperHeroes(): boolean {
        return !!this._superHeroes.length
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
        let superHeroesIds: number[] = []

        while (superHeroes.length < length) {
            let randomNumber: number = Math.floor(Math.random() * this._superHeroes.length)

            if (!superHeroesIds.includes(randomNumber)) {
                superHeroesIds.push(randomNumber)
                superHeroes.push(this._superHeroes[randomNumber])
            }
        }

        return superHeroes
    }

    list(): Observable<SuperHeroModel[]> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes)

        return this._httpClient.get<SuperHeroModel[]>(SUPERHERO.RESOURCE.LIST)
            .pipe(
                map((superHeroes: SuperHeroModel[]) => superHeroes.map((superHero: SuperHeroModel) => new SuperHeroModel(superHero))),
                tap((superHeroes: SuperHeroModel[]) => this._superHeroes = superHeroes)
            )
    }

    id(id: number): Observable<SuperHeroModel> {
        if (this.existsSuperHeroes())
            return of(this._superHeroes.find((superHero: SuperHeroModel) => superHero.id == id))

        const RESOURCE: string = SUPERHERO.RESOURCE.ID.replace('#{ID}', id.toString())

        return this._httpClient.get<SuperHeroModel>(RESOURCE)
            .pipe(
                map((superHero: SuperHeroModel) => new SuperHeroModel(superHero))
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