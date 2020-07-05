import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy, QuicklinkModule } from 'ngx-quicklink'

const routes: Routes = [{
  path: '',
  loadChildren: () => import('./superhero/superhero.module').then(m => m.SuperheroModule)
}, {
  path: '**',
  loadChildren: () => import('./superhero/superhero.module').then(m => m.SuperheroModule)
}];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      initialNavigation: 'enabled',
    })
  ],
  exports: [
    RouterModule,
    QuicklinkModule
  ]
})
export class AppRoutingModule { }