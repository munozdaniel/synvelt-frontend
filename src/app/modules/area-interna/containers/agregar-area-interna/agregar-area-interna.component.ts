import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IUsuario } from 'app/models/iUsuario';

@UntilDestroy()
@Component({
  selector: 'app-agregar-area-interna',
  templateUrl: './agregar-area-interna.component.html',
})
export class AgregarAreaInternaComponent implements OnInit, OnDestroy {
  //
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  constructor(
    private _areaInternaService: AreaInternaService,
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  setForm(evento: IAreaInterna) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar una nueva área interna, confirme esta operación.',
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
  guardar(areaInterna: IAreaInterna) {
    this.cargando = true;
    this._areaInternaService
      .guardar(areaInterna)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['areainternas']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el areaInterna',
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
