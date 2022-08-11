import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';
@UntilDestroy()
@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss'],
})
export class AsignarRolComponent implements OnInit {
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  usuariosSeleccionados: IUsuario[];
  rol: IRol;
  constructor(
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router,
    private _rolService: RolService
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
  setFiltros(evento: IRol) {
    this.rol = evento;
  }
  setUsuariosSeleccionados(usuarios: IUsuario[]) {
    this.usuariosSeleccionados = usuarios;
  }
  asignarRol() {
    if (this.usuariosSeleccionados?.length < 1 && this.rol?.id) {
      // Mensaje de error
      this._synveltConfirmationService.open({
        title: 'Formulario Incompleto',
        message: 'Tiene que seleccionar al menos un usuario y un rol',
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
      this._rolService
        .asignar(this.rol.id, usuariosIds)
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
