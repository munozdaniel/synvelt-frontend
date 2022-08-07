import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarRolComponent } from './containers/agregar-rol/agregar-rol.component';
import { EditarRolComponent } from './containers/editar-rol/editar-rol.component';
import { ListarRolesComponent } from './containers/listar-rol/listar-roles.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarRolesComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarRolComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'editar/:id',
    component: EditarRolComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolRoutingModule {}
