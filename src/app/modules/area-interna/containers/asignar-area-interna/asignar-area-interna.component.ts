import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
 import { UsuarioService } from 'app/core/services/usuario.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IUsuario } from 'app/models/iUsuario';
@UntilDestroy()
@Component({
  selector: 'app-asignar-area-interna',
  templateUrl: './asignar-area-interna.component.html',
  styleUrls: ['./asignar-area-interna.component.scss'],
})
export class AsignarAreaInternaComponent implements OnInit {
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  usuariosSeleccionados: IUsuario[];
  areaInterna: IAreaInterna;
  constructor(
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router,
    private _areaInternaService: AreaInternaService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  obtenerUsuarios() {
    this.cargandoUsuario = true;
    this._usuarioService
      .buscar()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargandoUsuario = false;
          this.usuarios = datos;
        },
        error => {
          this.cargandoUsuario = false;

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(evento: IAreaInterna) {
    this.areaInterna = evento;
  }
  setUsuariosSeleccionados(usuarios: IUsuario[]) {
    this.usuariosSeleccionados = usuarios;
  }
  asignarAreaInterna() {
    if (this.usuariosSeleccionados?.length < 1 && this.areaInterna?.id) {
      // Mensaje de error
      this._synveltConfirmationService.open({
        title: 'Formulario Incompleto',
        message: 'Tiene que seleccionar al menos un usuario y un areaInterna',
        actions: {
          confirm: {
            show: false,
            // label: 'Aceptar',
          },
          cancel: {
            show: true,
            label: 'Aceptar',
          },
        },
      });
    } else {
      this.cargando = true;
      const usuariosIds = this.usuariosSeleccionados.map(usuario => usuario.id);
      this._areaInternaService
        .asignar(this.areaInterna.id, usuariosIds)
        .pipe(untilDestroyed(this))
        .subscribe(
          datos => {
            this.cargando = true;
            this._synveltConfirmationService.success();
          },
          error => {
            this.cargando = true;
            console.log('[ERROR]', error);
          }
        );
    }
  }
}
