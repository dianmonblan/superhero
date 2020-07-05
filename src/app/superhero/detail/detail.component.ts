import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { SuperHeroModel } from '../../shared/models/superhero.model';
import { SuperHeroService } from '../../shared/services/superhero.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private _superHeroBehaviorSubject$: BehaviorSubject<SuperHeroModel> = new BehaviorSubject(new SuperHeroModel())
  superHero$: Observable<SuperHeroModel> = this._superHeroBehaviorSubject$.asObservable()

  constructor(
    private _superHeroService: SuperHeroService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.startSubscribers()
  }

  ngOnDestroy(): void {
    this._superHeroBehaviorSubject$.unsubscribe()
  }

  private startSubscribers(): void {
    this._activatedRoute.params.pipe(
      filter((params: Params) => params.superheroId),
      map((params: Params) => params.superheroId)
    ).subscribe((id: number) => this.detail(id))
  }

  detail(id: number): void {
    this._superHeroService.detail(id)
      .subscribe(
        (superHero: SuperHeroModel) => this._superHeroBehaviorSubject$.next(superHero),
        (error: HttpErrorResponse) => console.error(error)
      )
  }
}