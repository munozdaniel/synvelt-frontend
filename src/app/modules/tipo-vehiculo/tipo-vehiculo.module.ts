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
import { AgregarTipoVehiculoComponent } from './containers/agregar-tipo-vehiculo/agregar-tipo-vehiculo.component';
import { EditarTipoVehiculoComponent } from './containers/editar-tipo-vehiculo/editar-tipo-vehiculo.component';
import { ListarTiposVehiculoComponent } from './containers/listar-tipo-vehiculos/listar-tipo-vehiculos.component';
import { TipoVehiculoRoutingModule } from './tipo-vehiculo.routing';
import { FiltroTiposVehiculoComponent } from './ui/filtro-tipo-vehiculos/filtro-tipo-vehiculos.component';
import { TablaTiposVehiculoComponent } from './ui/tabla-tipo-vehiculos/tabla-tipo-vehiculos.component';
import { FormTipoVehiculoComponent } from './ui/form-tipo-vehiculo/form-tipo-vehiculo.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    EditarTipoVehiculoComponent,
    FormTipoVehiculoComponent,
    TablaTiposVehiculoComponent,
    FiltroTiposVehiculoComponent,
    ListarTiposVehiculoComponent,
    AgregarTipoVehiculoComponent,
    EditarTipoVehiculoComponent,
  ],
  imports: [
    CommonModule,
    TipoVehiculoRoutingModule,
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
    MatProgressBarModule,
  ],
})
export class TipoVehiculoModule {}
