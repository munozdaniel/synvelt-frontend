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
import { AgregarTipoSolicitudComponent } from './containers/agregar-tipo-solicitud/agregar-tipo-solicitud.component';
import { EditarTipoSolicitudComponent } from './containers/editar-tipo-solicitud/editar-tipo-solicitud.component';
import { ListarTiposSolicitudComponent } from './containers/listar-tipo-solicitudes/listar-tipo-solicitudes.component';
import { FiltroTiposSolicitudComponent } from './ui/filtro-tipo-solicitudes/filtro-tipo-solicitudes.component';
import { FormTipoSolicitudComponent } from './ui/form-tipo-solicitud/form-tipo-solicitud.component';
import { TablaTipoSolicitudesComponent } from './ui/tabla-tipo-solicitudes/tabla-tipo-solicitudes.component';
import { TipoSolicitudRoutingModule } from './tipo-solicitud.routing';
@NgModule({
  declarations: [
    FormTipoSolicitudComponent,
    TablaTipoSolicitudesComponent,
    FiltroTiposSolicitudComponent,
    ListarTiposSolicitudComponent,
    AgregarTipoSolicitudComponent,
    EditarTipoSolicitudComponent,
  ],
  imports: [
    CommonModule,
    TipoSolicitudRoutingModule,
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
export class TipoSolicitudModule {}
