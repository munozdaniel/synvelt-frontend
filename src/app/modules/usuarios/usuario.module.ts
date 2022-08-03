import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuariosComponent } from './containers/listar-usuarios/listar-usuarios.component';
import { TablaUsuariosComponent } from './ui/tabla-usuarios/tabla-usuarios.component';
import { FormUsuarioComponent } from './ui/form-usuario/form-usuario.component';
import { AgregarUsuarioComponent } from './containers/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './containers/editar-usuario/editar-usuario.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { SynveltCardModule } from '@synvelt/components/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ListarUsuariosComponent,
    TablaUsuariosComponent,
    FormUsuarioComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
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
    // NgxPermissionsModule.forChild(),
  ],
})
export class UsuarioModule {}
