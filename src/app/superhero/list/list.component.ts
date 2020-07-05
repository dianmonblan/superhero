import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { SuperHeroService } from '../../shared/services/superhero.service';
import { SuperHeroModel } from '../../shared/models/superhero.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private _superHeroesBehaviorSubject$: BehaviorSubject<SuperHeroModel[]> = new BehaviorSubject([])
  superHeroes$: Observable<SuperHeroModel[]> = this._superHeroesBehaviorSubject$.asObservable()

  constructor(private _superHeroService: SuperHeroService) { }

  ngOnInit(): void {
    this.list()
  }

  ngOnDestroy(): void {
    this._superHeroesBehaviorSubject$.unsubscribe()
  }

  list(): void {
    this._superHeroService.list()
      .subscribe(
        (superHeroes: SuperHeroModel[]) => this._superHeroesBehaviorSubject$.next(superHeroes),
        (error: HttpErrorResponse) => console.error(error)
      )
  }

  trackByFunction(superHeroModel: SuperHeroModel): number {
    return superHeroModel.id
  }
}
