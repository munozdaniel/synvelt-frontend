import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarModelosComponent } from './containers/listar-modelos/listar-modelos.component';
import { AgregarModeloComponent } from './containers/agregar-modelo/agregar-modelo.component';
import { EditarModeloComponent } from './containers/editar-modelo/editar-modelo.component';
import { FormModeloComponent } from './ui/form-modelo/form-modelo.component';
import { TablaModeloComponent } from './ui/tabla-modelo/tabla-modelo.component';
import { ModeloRoutingModule } from './modelo-routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SynveltCardModule } from '@synvelt/components/card';
import { BuscarAreaInternaModule } from 'app/shared/buscar-area-interna/buscar-area-interna.module';
import { SeleccionarUsuariosTablaModule } from 'app/shared/seleccionar-usuarios-tabla/seleccionar-usuarios-tabla.module';
import { TablaUsuariosModule } from 'app/shared/tabla-usuarios/tabla-usuarios.module';
import { NgxMaskModule } from 'ngx-mask';
import { FiltroModeloComponent } from './ui/filtro-modelos/filtro-modelos.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    ListarModelosComponent,
    AgregarModeloComponent,
    EditarModeloComponent,
    FormModeloComponent,
    TablaModeloComponent,
    FiltroModeloComponent,
  ],
  imports: [
    CommonModule,
    ModeloRoutingModule,
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
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    // NgxPermissionsModule.forChild(),
    NgxMaskModule.forChild(),
    TablaUsuariosModule,
    BuscarAreaInternaModule,
    SeleccionarUsuariosTablaModule,
    MatTooltipModule,
  ],
})
export class ModeloModule {}
