import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';

@UntilDestroy()
@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
})
export class AgregarRolComponent implements OnInit, OnDestroy {
  //
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  constructor(
    private _rolService: RolService,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  setForm(evento: IRol) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar un nuevo rol, confirme esta operación.',
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
      if (result === 'confirmed') {
        this.guardar(evento);
      }
    });
  }
  guardar(rol: IRol) {
    this.cargando = true;
    this._rolService
      .guardar(rol)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['roles']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el rol',
              error.error.error.message
            );
          } else {
            this._errorService.showMessage(error);
          }
          console.log('[ERROR]', error);
        }
      );
  }
}
