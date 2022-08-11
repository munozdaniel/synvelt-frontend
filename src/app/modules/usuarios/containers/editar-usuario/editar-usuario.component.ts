import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';
import { Observable, Subscription } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  roles$: Observable<IRol[]>; //
  cargando = false;
  usuario: IUsuario;
  usuarioId: string;
  usernameValido = false;
  //
  suscripcionUsername: Subscription;
  areasInternas$: Observable<IAreaInterna[]>;
  constructor(
    private _areaInternaService: AreaInternaService,
    private _activeRoute: ActivatedRoute,
    private _rolService: RolService,
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.suscripcionUsername) {
      this.suscripcionUsername.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.obtenerRoles(); // Recuperamos el id de la url y buscamos el usuario
    this.obtenerAreasInternas();
    this._activeRoute.params.subscribe(params => {
      this.usuarioId = params['id'];
      if (this.usuarioId) {
        this.obtenerUsuarioPorId();
      } else {
        // TODO: Controlar que fucnione y mostrar mensaje: 'El usuario solicitado no se encuentra disponible'
        this._router.navigate(['usuarios']);
      }
    });
  }
  obtenerAreasInternas() {
    this.areasInternas$ = this._areaInternaService.obtenertodos();
  }
  obtenerRoles() {
    this.roles$ = this._rolService.obtenertodos();
  }
  obtenerUsuarioPorId() {
    this.cargando = true;
    this._usuarioService
      .buscar({ id: this.usuarioId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.usuario = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IUsuario) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar Operación',
      message: 'Está por editar un usuario, desea continuar?',
      icon: {
        name: 'heroicons_solid:question-mark-circle',
        color: 'info',
      },
      actions: {
        confirm: {
          label: 'Guardar',
          color: 'primary',
        },
        cancel: {
          label: 'Cancelar',
        },
      },
    });

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'confirmed') {
        this.actualizar(evento);
      }
    });
  }
  actualizar(usuario: IUsuario) {
    this.cargando = true;
    this._usuarioService
      .guardar({ ...usuario })
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['usuarios']);
          });
        },
        error => {
          this.cargando = false;
          this._synveltConfirmationService.error();
          console.log('[ERROR]', error);
        }
      );
  }
}
