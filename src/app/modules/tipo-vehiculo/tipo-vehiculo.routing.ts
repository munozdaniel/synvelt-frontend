import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTipoVehiculoComponent } from './containers/agregar-tipo-vehiculo/agregar-tipo-vehiculo.component';
import { EditarTipoVehiculoComponent } from './containers/editar-tipo-vehiculo/editar-tipo-vehiculo.component';
import { ListarTiposVehiculoComponent } from './containers/listar-tipo-vehiculos/listar-tipo-vehiculos.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarTiposVehiculoComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarTipoVehiculoComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarTipoVehiculoComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoVehiculoRoutingModule {}
