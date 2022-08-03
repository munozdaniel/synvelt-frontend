import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { MaterialModule } from './material/material.module';
import { ContenidoExpansibleComponent } from './contenido-expansible/contenido-expansible.component';
import { MostrarImagenComponent } from './mostrar-imagen/mostrar-imagen.component';
import { MostrarValorComponent } from './mostrar-valor/mostrar-valor.component';
import { ControlMessagesComponent } from './controlmessage/control-messages.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    MostrarValorComponent,
    ControlMessagesComponent,
    ContenidoExpansibleComponent,
    MostrarImagenComponent,
    ControlMessagesComponent,
    MostrarValorComponent,
    ContenidoExpansibleComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbComponent,
    MostrarImagenComponent,
    ControlMessagesComponent,
    MostrarValorComponent,
    ContenidoExpansibleComponent,
  ],
})
export class SharedModule {}
