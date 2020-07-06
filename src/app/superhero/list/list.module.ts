import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'lazysizes';

import { SuperHeroListComponent } from './list.component';
import { SuperHeroListRoutingModule } from './list-routing.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [SuperHeroListComponent],
  imports: [
    CommonModule,
    PipesModule,
    SuperHeroListRoutingModule
  ],
  exports: [
    SuperHeroListComponent
  ]
})
export class SuperHeroListModule { }