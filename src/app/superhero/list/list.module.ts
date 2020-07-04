import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { DirectivesModule } from '../../shared/directives/directives.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    ListRoutingModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }