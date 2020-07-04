import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SuperHeroService } from '../../shared/services/superhero.service';
import { SuperHeroModel } from '../../shared/models/superhero.model';
import { HttpErrorResponse } from '@angular/common/http';

const NUMBER_SUPERHEROES_FOR_LIST: number = 20

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  private _superHeroesBehaviorSubject: BehaviorSubject<SuperHeroModel[]> = new BehaviorSubject([])
  superHeroes: Observable<SuperHeroModel[]> = this._superHeroesBehaviorSubject.asObservable()
  superHeroesImageLazyLoadingInProcess: boolean[] = new Array(NUMBER_SUPERHEROES_FOR_LIST)

  constructor(private _superHeroService: SuperHeroService) {
    this.list()
  }

  ngOnDestroy(): void {
    this._superHeroesBehaviorSubject.unsubscribe()
  }

  list(): void {
    this._superHeroService.random(NUMBER_SUPERHEROES_FOR_LIST)
      .subscribe(
        (superHeroes: SuperHeroModel[]) => this._superHeroesBehaviorSubject.next(superHeroes),
        (error: HttpErrorResponse) => console.error
      )
  }

  trackByFunction(superHeroModel: SuperHeroModel): number {
    return superHeroModel.id
  }
}
