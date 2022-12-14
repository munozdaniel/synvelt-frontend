import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuariosComponent } from './containers/listar-usuarios/listar-usuarios.component';
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
import { FiltroUsuariosComponent } from './ui/filtro-usuarios/filtro-usuarios.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { TablaUsuariosModule } from 'app/shared/tabla-usuarios/tabla-usuarios.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    ListarUsuariosComponent,
    FormUsuarioComponent,
    AgregarUsuarioComponent,
    EditarUsuarioComponent,
    FiltroUsuariosComponent,
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
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    // NgxPermissionsModule.forChild(),
    NgxMaskModule.forRoot(maskConfig),
    TablaUsuariosModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
})
export class UsuarioModule {}
