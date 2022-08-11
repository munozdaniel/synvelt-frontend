import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarAreaInternaComponent } from './containers/agregar-area-interna/agregar-area-interna.component';
import { AsignarAreaInternaComponent } from './containers/asignar-area-interna/asignar-area-interna.component';
import { EditarAreaInternaComponent } from './containers/editar-area-interna/editar-area-interna.component';
import { ListarAreaInternaesComponent } from './containers/listar-areas-internas/listar-areas-internas.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarAreaInternaesComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarAreaInternaComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'asignar',
    component: AsignarAreaInternaComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'editar/:id',
    component: EditarAreaInternaComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreaInternaRoutingModule {}
