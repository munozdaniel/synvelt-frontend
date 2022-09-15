import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarLocalidadComponent } from './containers/agregar-localidad/agregar-localidad.component';
import { EditarLocalidadComponent } from './containers/editar-localidad/editar-localidad.component';
import { ListarLocalidadesComponent } from './containers/listar-localidades/listar-localidades.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarLocalidadesComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarLocalidadComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarLocalidadComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalidadRoutingModule {}
