import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarContrasenaComponent } from './containers/cambiar-contrasena/cambiar-contrasena.component';
// home
const routes: Routes = [
  {
    path: '',
    component: CambiarContrasenaComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilRoutingModule {}
