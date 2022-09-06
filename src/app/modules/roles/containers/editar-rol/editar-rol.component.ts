import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { IRol } from 'app/models/iRol';

import { Observable, Subscription } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-rol',
  templateUrl: './editar-rol.component.html',
})
export class EditarRolComponent implements OnInit, OnDestroy {
  roles$: Observable<IRol[]>; //
  cargando = false;
  rol: IRol;
  rolId: string;
  usernameValido = false;
  //
  suscripcionUsername: Subscription;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _rolService: RolService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.suscripcionUsername) {
      this.suscripcionUsername.unsubscribe();
    }
  }

  ngOnInit(): void {
    // this.obtenerRoles();
    // Recuperamos el id de la url y buscamos el rol
    this._activeRoute.params.subscribe(params => {
      this.rolId = params['id'];
      console.log('this.rolId', this.rolId);
      if (this.rolId) {
        this.obtenerRolPorId();
      } else {
        // TODO: Controlar que fucnione y mostrar mensaje: 'El rol solicitado no se encuentra disponible'
        this._router.navigate(['rols']);
      }
    });
  }
  //   obtenerRoles() {
  //     this.roles$ = this._rolService.obtenertodos();
  //   }
  obtenerRolPorId() {
    this.cargando = true;
    this._rolService
      .obtenertodos({ id: this.rolId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.rol = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IRol) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar un rol, desea continuar?',
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
  actualizar(rol: IRol) {
    this.cargando = true;
    this._rolService
      .guardar({ ...rol })
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['rols']);
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
