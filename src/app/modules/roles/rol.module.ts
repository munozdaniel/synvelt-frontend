import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolRoutingModule } from './rol-routing.module';
import { SynveltCardModule } from '@synvelt/components/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ListarRolesComponent } from './containers/listar-rol/listar-roles.component';
import { FiltroRolesComponent } from './ui/filtro-roles/filtro-roles.component';
import { FormRolComponent } from './ui/form-rol/form-rol.component';
import { AgregarRolComponent } from './containers/agregar-rol/agregar-rol.component';
import { EditarRolComponent } from './containers/editar-rol/editar-rol.component';
import { TablaRolesComponent } from './ui/tabla-roles/tabla-roles.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AgregarRolComponent,
    EditarRolComponent,
    ListarRolesComponent,
    TablaRolesComponent,
    FiltroRolesComponent,
    FormRolComponent,
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
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
    MatMenuModule,
    MatSlideToggleModule,
    // NgxPermissionsModule.forChild(),
    NgxMaskModule.forRoot(maskConfig),
  ],
})
export class RolModule {}
