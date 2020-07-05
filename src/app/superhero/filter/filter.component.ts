import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, distinct, map } from 'rxjs/operators';
import { Params, ParamMap, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-superhero-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class SuperHeroFilterComponent implements OnInit, OnDestroy {
  private _activatedRouteQueryParamFilterSubscription$: Subscription
  filterForm: FormGroup = new FormGroup({
    filter: new FormControl('')
  })

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.startFiltervalueChanges()
    this.startActivatedRouteQueryParamFilterSubscription()
  }

  ngOnDestroy(): void {
    this._activatedRouteQueryParamFilterSubscription$.unsubscribe()
  }

  private startFiltervalueChanges(): void {
    this.filterForm.controls.filter.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe((value: string) => this.addFilterToRouteQueryParams())
  }

  private startActivatedRouteQueryParamFilterSubscription(): void {
    this._activatedRouteQueryParamFilterSubscription$ = this._activatedRoute.queryParamMap.pipe(
      // filter((paramMap: ParamMap) => paramMap.has('filter')),
      distinct((paramMap: ParamMap) => paramMap.has('filter') === this.filterForm.controls.filter.value),
      map((paramMap: ParamMap) => paramMap.get('filter'))
    ).subscribe((filter: string) => {
      this.filterForm.controls.filter.setValue(filter)
    })
  }

  addFilterToRouteQueryParams(filter: string = this.filterForm.controls.filter.value): void {
    let params: Params = {
      filter: filter || null
    }

    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: params,
      queryParamsHandling: 'merge'
    })
  }

  onSubmit(): void {
    this.addFilterToRouteQueryParams()
  }
}
