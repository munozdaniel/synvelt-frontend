import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarPreguntaFrecuenteComponent } from './containers/agregar-pregunta/agregar-pregunta.component';
import { EditarPreguntaFrecuenteComponent } from './containers/editar-pregunta/editar-pregunta.component';
import { ListarPreguntasFrecuentesComponent } from './containers/listar-preguntas/listar-preguntas.component';
// home
const routes: Routes = [
  {
    path: '',
    component: ListarPreguntasFrecuentesComponent,
    //  DEBE estar autenticados
  },
  {
    path: 'nuevo',
    component: AgregarPreguntaFrecuenteComponent,
    //  DEBE estar autenticados
  },

  {
    path: 'editar/:id',
    component: EditarPreguntaFrecuenteComponent,
    //  DEBE estar autenticados
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreguntaRoutingModule {}
