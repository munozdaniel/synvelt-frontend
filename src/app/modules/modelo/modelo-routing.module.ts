import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarModeloComponent } from './containers/agregar-modelo/agregar-modelo.component';
import { EditarModeloComponent } from './containers/editar-modelo/editar-modelo.component';
import { ListarModelosComponent } from './containers/listar-modelos/listar-modelos.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarModelosComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarModeloComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarModeloComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeloRoutingModule {}
