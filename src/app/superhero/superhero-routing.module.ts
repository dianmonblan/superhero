import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperHeroComponent } from './superhero.component';

const routes: Routes = [{
  path: ':superheroId',
  loadChildren: () => import('./detail/detail.module').then(m => m.SuperHeroDetailModule),
}, {
  path: '',
  component: SuperHeroComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroRoutingModule { }
