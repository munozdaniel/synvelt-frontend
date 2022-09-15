import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarVehiculoComponent } from './containers/agregar-vehiculo/agregar-vehiculo.component';
import { EditarVehiculoComponent } from './containers/editar-vehiculo/editar-vehiculo.component';
import { ListarVehiculosComponent } from './containers/listar-vehiculos/listar-vehiculos.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarVehiculosComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarVehiculoComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarVehiculoComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoRoutingModule {}
