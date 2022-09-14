import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarLocalidadComponent } from './containers/agregar-localidad/agregar-localidad.component';
import { EditarLocalidadComponent } from './containers/editar-localidad/editar-localidad.component';
import { ListarLocalidadesComponent } from './containers/listar-localidades/listar-localidades.component';
import { FormLocalidadComponent } from './ui/form-localidad/form-localidad.component';
import { TablaLocalidadesComponent } from './ui/tabla-localidades/tabla-localidades.component';
import { LocalidadRoutingModule } from './localidad.routing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
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
import { FiltroLocalidadesComponent } from './ui/filtro-localidades/filtro-localidades.component';

@NgModule({
  declarations: [
    AgregarLocalidadComponent,
    EditarLocalidadComponent,
    ListarLocalidadesComponent,
    FormLocalidadComponent,
    TablaLocalidadesComponent,
    FiltroLocalidadesComponent,
  ],
  imports: [
    CommonModule,
    LocalidadRoutingModule,
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
export class LocalidadModule {}
