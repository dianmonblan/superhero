import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperHeroRoutingModule } from './superhero-routing.module';
import { SuperHeroComponent } from './superhero.component';
import { SuperHeroListModule } from './list/list.module';
import { SuperHeroFilterModule } from './filter/filter.module';

@NgModule({
  declarations: [SuperHeroComponent],
  imports: [
    CommonModule,
    SuperHeroRoutingModule,
    SuperHeroListModule,
    SuperHeroFilterModule
  ]
})
export class SuperheroModule { }
