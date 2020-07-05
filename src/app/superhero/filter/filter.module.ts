import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SuperHeroFilterComponent } from './filter.component';

@NgModule({
  declarations: [SuperHeroFilterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SuperHeroFilterComponent
  ]
})
export class SuperHeroFilterModule { }
