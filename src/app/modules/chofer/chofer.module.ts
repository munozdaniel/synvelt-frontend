import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarChoferComponent } from './containers/agregar-chofer/agregar-chofer.component';
import { EditarChoferComponent } from './containers/editar-chofer/editar-chofer.component';
import { ListarChoferesComponent } from './containers/listar-choferes/listar-choferes.component';
import { FormChoferComponent } from './ui/form-chofer/form-chofer.component';
import { TablaChoferesComponent } from './ui/tabla-choferes/tabla-choferes.component';
import { ChoferRoutingModule } from './chofer.routing';
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
import { FiltroChoferesComponent } from './ui/filtro-choferes/filtro-choferes.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AgregarChoferComponent,
    EditarChoferComponent,
    ListarChoferesComponent,
    FormChoferComponent,
    TablaChoferesComponent,
    FiltroChoferesComponent,
  ],
  imports: [
    CommonModule,
    ChoferRoutingModule,
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
export class ChoferModule {}
