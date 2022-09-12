import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/core/services/usuario.service';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IUsuario } from 'app/models/iUsuario';
import { IRol } from 'app/models/iRol';
import { RolService } from 'app/core/services/rol.service';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
@UntilDestroy()
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: IUsuario[];
  cargando = false;
  roles: IRol[];
  parametros: any;
  areasInternas: IAreaInterna[];
  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _areaInternaService: AreaInternaService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
    this.obtenerRoles();
    this.obtenerAreasInternas();
  }
  obtenerAreasInternas() {
    this._areaInternaService.obtenertodos().subscribe(areasInternas => {
      this.areasInternas = areasInternas;
    });
  }
  obtenerRoles() {
    this._rolService
      .obtenertodos()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.roles = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  obtenerTodos() {
    this.cargando = true;
    this._usuarioService
      .buscar(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.usuarios = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }
  redireccionarAgregar() {
    this._router.navigate(['usuarios/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['usuarios/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por eliminar un usuario, confirme esta operación.',
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Eliminar',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Cancelar',
        },
      },
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe(result => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        this.confirmarEliminar(evento);
      }
    });
  }
  confirmarEliminar(id: string) {
    this.cargando = true;
    this._usuarioService
      .eliminar(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          this._synveltConfirmationService.success();
          this.obtenerTodos();
        },
        error => {
          this._synveltConfirmationService.error();

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(parametros) {
    console.log('setFiltros', parametros);
    this.parametros = parametros;
    this.obtenerTodos();
  }
  setAsignarRol(evento: string) {
    this._router.navigate(['usuarios/asignar-rol', evento]);
  }
}
