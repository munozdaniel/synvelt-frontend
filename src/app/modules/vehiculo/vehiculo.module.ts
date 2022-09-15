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
import { AgregarVehiculoComponent } from './containers/agregar-vehiculo/agregar-vehiculo.component';
import { EditarVehiculoComponent } from './containers/editar-vehiculo/editar-vehiculo.component';
import { ListarVehiculosComponent } from './containers/listar-vehiculos/listar-vehiculos.component';
import { FiltroVehiculosComponent } from './ui/filtro-vehiculos/filtro-vehiculos.component';
import { FormVehiculoComponent } from './ui/form-vehiculo/form-vehiculo.component';
import { TablaVehiculosComponent } from './ui/tabla-vehiculos/tabla-vehiculos.component';
import { VehiculoRoutingModule } from './vehiculo.routing';

@NgModule({
  declarations: [
    AgregarVehiculoComponent,
    EditarVehiculoComponent,
    ListarVehiculosComponent,
    FormVehiculoComponent,
    TablaVehiculosComponent,
    FiltroVehiculosComponent,
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
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
export class VehiculoModule {}
