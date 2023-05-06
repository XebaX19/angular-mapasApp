import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapasModule } from './mapas/mapas.module';
import { AlonePageComponent } from './alone/pages/alone-page/alone-page.component';

const routes: Routes = [
  {
    path: 'mapas',
    loadChildren: () => import('./mapas/mapas.module').then(m => m.MapasModule)
  },
  {
    //Forma de importar de manera perezosa un "standalone" component
    path: 'alone',
    loadComponent: () => import('./alone/pages/alone-page/alone-page.component').then(m => m.AlonePageComponent)
  },
  {
    path: '**',
    redirectTo: 'mapas'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
