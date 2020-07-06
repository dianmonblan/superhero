import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { SuperHeroService } from '../../shared/services/superhero.service';
import { SuperHeroModel } from '../../shared/models/superhero.model';
import { Title, Meta } from '@angular/platform-browser';
import { SUPERHERO } from '../../../environments/environment';

@Component({
  selector: 'app-superhero-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SuperHeroListComponent implements OnInit, OnDestroy {
  private _activatedRouteQueryParamFilterSubscription$: Subscription
  private _superHeroesBehaviorSubject$: BehaviorSubject<SuperHeroModel[]> = new BehaviorSubject(null)
  superHeroes$: Observable<SuperHeroModel[]> = this._superHeroesBehaviorSubject$.asObservable()

  constructor(
    private _superHeroService: SuperHeroService,
    private _title: Title,
    private _meta: Meta,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startActivatedRouteQueryParamFilterSubscription()
  }

  ngOnDestroy(): void {
    this._superHeroesBehaviorSubject$.unsubscribe()
    this._activatedRouteQueryParamFilterSubscription$.unsubscribe()
  }

  private startActivatedRouteQueryParamFilterSubscription(): void {
    this._activatedRouteQueryParamFilterSubscription$ = this._activatedRoute.queryParamMap.pipe(
      map((paramMap: ParamMap) => paramMap.get('filter'))
    ).subscribe((filter: string) => this.list(filter))
  }

  list(filter: string = null): void {
    const random: boolean = filter ? false : true
    this._superHeroService.list(filter, random)
      .subscribe(
        (superHeroes: SuperHeroModel[]) => {
          this._title.setTitle(`${(<{ [key: string]: string }>SUPERHERO.CONFIGURATION.LIST).TITLE} / ${SUPERHERO.CONFIGURATION.TITLE}`)

          this._meta.updateTag({
            name: 'description',
            content: superHeroes.reduce((description: string, superHero: SuperHeroModel) => `${superHero.name}, ${description} `, '')
          })

          this._meta.updateTag({
            name: 'keywords',
            content: superHeroes.reduce((keywords: string, superHero: SuperHeroModel) => `${superHero.name},${keywords} `, '')
          })

          this._superHeroesBehaviorSubject$.next(superHeroes)
        }
      )
  }

  trackByFunction(superHeroModel: SuperHeroModel): number {
    return superHeroModel.id
  }
}
