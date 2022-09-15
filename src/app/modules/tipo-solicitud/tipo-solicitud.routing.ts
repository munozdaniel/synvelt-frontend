import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTipoSolicitudComponent } from './containers/agregar-tipo-solicitud/agregar-tipo-solicitud.component';
import { EditarTipoSolicitudComponent } from './containers/editar-tipo-solicitud/editar-tipo-solicitud.component';
import { ListarTiposSolicitudComponent } from './containers/listar-tipo-solicitudes/listar-tipo-solicitudes.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarTiposSolicitudComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarTipoSolicitudComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarTipoSolicitudComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoSolicitudRoutingModule {}
