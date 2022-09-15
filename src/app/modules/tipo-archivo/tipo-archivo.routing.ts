import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarTipoArchivoComponent } from './containers/agregar-tipo-archivo/agregar-tipo-archivo.component';
import { EditarTipoArchivoComponent } from './containers/editar-tipo-archivo/editar-tipo-archivo.component';
import { ListarTiposArchivoComponent } from './containers/listar-tipo-archivos/listar-tipo-archivos.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarTiposArchivoComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarTipoArchivoComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarTipoArchivoComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoArchivoRoutingModule {}
