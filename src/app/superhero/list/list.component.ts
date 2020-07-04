import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { SuperHeroService, NUMBER_SUPERHEROES_FOR_LIST } from '../../shared/services/superhero.service';
import { SuperHeroModel } from '../../shared/models/superhero.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  private _superHeroesBehaviorSubject: BehaviorSubject<SuperHeroModel[]> = new BehaviorSubject([])
  superHeroes: Observable<SuperHeroModel[]> = this._superHeroesBehaviorSubject.asObservable()

  constructor(private _superHeroService: SuperHeroService) {
    this.list()
  }

  ngOnDestroy(): void {
    this._superHeroesBehaviorSubject.unsubscribe()
  }

  list(): void {
    this._superHeroService.list()
      .subscribe(
        (superHeroes: SuperHeroModel[]) => this._superHeroesBehaviorSubject.next(superHeroes),
        (error: HttpErrorResponse) => console.error
      )
  }

  trackByFunction(superHeroModel: SuperHeroModel): number {
    return superHeroModel.id
  }
}
