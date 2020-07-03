import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./superhero/superhero.module').then(m => m.SuperheroModule)
}, {
  path: '**',
  loadChildren: () => import('./superhero/superhero.module').then(m => m.SuperheroModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
