import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambiarContrasenaComponent } from './containers/cambiar-contrasena/cambiar-contrasena.component';
import { PerfilRoutingModule } from './perfil.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'app/shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [CambiarContrasenaComponent],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatProgressBarModule,
  ],
})
export class PerfilModule {}
