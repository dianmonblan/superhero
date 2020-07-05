import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailComponent } from './detail.component';
import { DetailRoutingModule } from './detail-routing.module';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    DetailRoutingModule
  ],
  exports: [
    DetailComponent
  ]
})
export class DetailModule { }