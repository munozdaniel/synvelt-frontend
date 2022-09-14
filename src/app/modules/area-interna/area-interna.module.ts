import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SynveltCardModule } from '@synvelt/components/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TablaUsuariosModule } from 'app/shared/tabla-usuarios/tabla-usuarios.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SeleccionarUsuariosTablaModule } from 'app/shared/seleccionar-usuarios-tabla/seleccionar-usuarios-tabla.module';
import { BuscarAreaInternaModule } from 'app/shared/buscar-area-interna/buscar-area-interna.module';
import { AreaInternaRoutingModule } from './area-interna-routing.module';
import { AgregarAreaInternaComponent } from './containers/agregar-area-interna/agregar-area-interna.component';
import { AsignarAreaInternaComponent } from './containers/asignar-area-interna/asignar-area-interna.component';
import { EditarAreaInternaComponent } from './containers/editar-area-interna/editar-area-interna.component';
import { ListarAreasInternasComponent } from './containers/listar-areas-internas/listar-areas-internas.component';
import { FormAreaInternaComponent } from './ui/form-area-interna/form-area-interna.component';
import { TablaAreasInternasComponent } from './ui/tabla-areas-internas/tabla-areas-internas.component';
import { FiltroAreasInternasComponent } from './ui/filtro-areas-internas/filtro-areas-internas.component';
import { MatTooltipModule } from '@angular/material/tooltip';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AgregarAreaInternaComponent,
    EditarAreaInternaComponent,
    ListarAreasInternasComponent,
    TablaAreasInternasComponent,
    FiltroAreasInternasComponent,
    FormAreaInternaComponent,
    AsignarAreaInternaComponent,
  ],
  imports: [
    CommonModule,
    AreaInternaRoutingModule,
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
    NgxMaskModule.forRoot(maskConfig),
    TablaUsuariosModule,
    BuscarAreaInternaModule,
    SeleccionarUsuariosTablaModule,
    MatTooltipModule
  ],
})
export class AreaInternaModule {}
