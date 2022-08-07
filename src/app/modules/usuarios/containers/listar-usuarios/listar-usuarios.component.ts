import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/core/services/usuario.service';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IUsuario } from 'app/models/iUsuario';
import { IRol } from 'app/models/iRol';
import { Observable } from 'rxjs';
import { RolService } from 'app/core/services/rol.service';
@UntilDestroy()
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: IUsuario[];
  cargando = false;
  roles$: Observable<IRol[]>;
  parametros: any;
  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
    this.obtenerRoles();
  }
  obtenerRoles() {
    this.roles$ = this._rolService.obtenertodos();
  }
  obtenerTodos() {
    this.cargando = true;
    this._usuarioService
      .buscar(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          console.log('datos', datos);
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
    console.log('redireccionarAgregar');
    this._router.navigate(['usuarios/agregar']);
  }
  setEditar(evento: string) {
    this._router.navigate(['usuarios/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar Operación',
      message: '¿Está seguro de continuar con la eliminación del usuario?',
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
  confirmarEliminar(_id: string) {
    this.cargando = true;
    this._usuarioService
      .eliminar(_id)
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
}
