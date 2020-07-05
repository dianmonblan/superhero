import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperHeroListComponent } from './list.component';
import { SuperHeroListRoutingModule } from './list-routing.module';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [SuperHeroListComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    SuperHeroListRoutingModule
  ],
  exports: [
    SuperHeroListComponent
  ]
})
export class SuperHeroListModule { }