import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SynveltCardModule } from '@synvelt/components/card';
import { SharedModule } from 'app/shared/shared.module';
import { PreguntaRoutingModule } from './pregunta.routing';
import { ListarPreguntasFrecuentesComponent } from './containers/listar-preguntas/listar-preguntas.component';
import { AgregarPreguntaFrecuenteComponent } from './containers/agregar-pregunta/agregar-pregunta.component';
import { EditarPreguntaFrecuenteComponent } from './containers/editar-pregunta/editar-pregunta.component';
import { FormPreguntaFrecuenteComponent } from './ui/form-pregunta/form-pregunta.component';
import { TablaPreguntasFrecuentesComponent } from './ui/tabla-preguntas/tabla-preguntas.component';
import { FiltroPreguntasFrecuentesComponent } from './ui/filtro-preguntas/filtro-preguntas.component';

@NgModule({
  declarations: [
    AgregarPreguntaFrecuenteComponent,
    EditarPreguntaFrecuenteComponent,
    ListarPreguntasFrecuentesComponent,
    FormPreguntaFrecuenteComponent,
    TablaPreguntasFrecuentesComponent,
    FiltroPreguntasFrecuentesComponent,
  ],
  imports: [
    CommonModule,
    PreguntaRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    SynveltCardModule,
    FormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    // NgxPermissionsModule.forChild(),
    MatTooltipModule,
  ],
})
export class PreguntaModule {}
