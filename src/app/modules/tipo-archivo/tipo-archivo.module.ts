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
import { AgregarTipoArchivoComponent } from './containers/agregar-tipo-archivo/agregar-tipo-archivo.component';
import { EditarTipoArchivoComponent } from './containers/editar-tipo-archivo/editar-tipo-archivo.component';
import { ListarTiposArchivoComponent } from './containers/listar-tipo-archivos/listar-tipo-archivos.component';
import { TipoArchivoRoutingModule } from './tipo-archivo.routing';
import { FiltroTiposArchivoComponent } from './ui/filtro-tipo-archivos/filtro-tipo-archivos.component';
import { TablaTiposArchivoComponent } from './ui/tabla-tipo-archivos/tabla-tipo-archivos.component';
import { FormTipoArchivoComponent } from './ui/form-tipo-archivo/form-tipo-archivo.component';

@NgModule({
  declarations: [
    EditarTipoArchivoComponent,
    FormTipoArchivoComponent,
    TablaTiposArchivoComponent,
    FiltroTiposArchivoComponent,
    ListarTiposArchivoComponent,
    AgregarTipoArchivoComponent,
    EditarTipoArchivoComponent,
  ],
  imports: [
    CommonModule,
    TipoArchivoRoutingModule,
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
export class TipoArchivoModule {}
