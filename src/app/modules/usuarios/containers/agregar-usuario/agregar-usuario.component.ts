import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IUsuario } from 'app/models/iUsuario';

@UntilDestroy()
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
})
export class AgregarUsuarioComponent implements OnInit, OnDestroy {
  //
  cargando = false;

  constructor(
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  setForm(evento: IUsuario) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar Operación',
      message: 'Está por guardar un nuevo usuario, desea continuar?',
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
        this.guardar(evento);
      }
    });
  }
  guardar(usuario: IUsuario) {
    this.cargando = true;
    this._usuarioService
      .guardar(usuario)
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
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el usuario',
              error.error.error.message
            );
          } else {
            this._synveltConfirmationService.error();
          }
          console.log('[ERROR]', error);
        }
      );
  }
}
