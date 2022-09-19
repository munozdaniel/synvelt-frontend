import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarChoferComponent } from './containers/agregar-chofer/agregar-chofer.component';
import { EditarChoferComponent } from './containers/editar-chofer/editar-chofer.component';
import { ListarChoferesComponent } from './containers/listar-choferes/listar-choferes.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarChoferesComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarChoferComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarChoferComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoferRoutingModule {}
