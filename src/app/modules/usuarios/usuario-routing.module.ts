import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarUsuarioComponent } from './containers/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './containers/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './containers/listar-usuarios/listar-usuarios.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarUsuariosComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarUsuarioComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'editar/:id',
    component: EditarUsuarioComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
