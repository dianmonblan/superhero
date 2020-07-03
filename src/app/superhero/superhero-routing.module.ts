import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: ':superheroId',
  loadChildren: () => import('./id/id.module').then(m => m.IdModule)
}, {
  path: '',
  loadChildren: () => import('./list/list.module').then(m => m.ListModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperHeroRoutingModule { }
