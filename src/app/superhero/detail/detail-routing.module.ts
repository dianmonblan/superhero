import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperHeroDetailComponent } from './detail.component';

const routes: Routes = [{
  path: '',
  component: SuperHeroDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroDetailRoutingModule { }
