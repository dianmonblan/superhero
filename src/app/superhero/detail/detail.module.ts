import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'lazysizes';

import { SuperHeroDetailComponent } from './detail.component';
import { SuperHeroDetailRoutingModule } from './detail-routing.module';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [SuperHeroDetailComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    SuperHeroDetailRoutingModule
  ],
  exports: [
    SuperHeroDetailComponent
  ]
})
export class SuperHeroDetailModule { }