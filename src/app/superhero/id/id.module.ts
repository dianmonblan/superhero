import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdComponent } from './id.component';
import { IdRoutingModule } from './id-routing.module';

@NgModule({
  declarations: [IdComponent],
  imports: [
    CommonModule,
    IdRoutingModule
  ],
  exports: [
    IdComponent
  ]
})
export class IdModule { }