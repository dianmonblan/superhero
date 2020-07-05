import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { SuperHeroService } from '../../shared/services/superhero.service';
import { SuperHeroModel } from '../../shared/models/superhero.model';
import { Title, Meta } from '@angular/platform-browser';
import { SUPERHERO } from '../../../environments/environment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private _superHeroesBehaviorSubject$: BehaviorSubject<SuperHeroModel[]> = new BehaviorSubject(null)
  superHeroes$: Observable<SuperHeroModel[]> = this._superHeroesBehaviorSubject$.asObservable()

  constructor(
    private _superHeroService: SuperHeroService,
    private _title: Title,
    private _meta: Meta
  ) { }

  ngOnInit(): void {
    this.list()
  }

  ngOnDestroy(): void {
    this._superHeroesBehaviorSubject$.unsubscribe()
  }

  list(): void {
    this._superHeroService.list()
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
