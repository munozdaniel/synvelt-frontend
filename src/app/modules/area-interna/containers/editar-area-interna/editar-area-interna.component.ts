import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { ErrorService } from 'app/core/services/error.service';
import { IAreaInterna } from 'app/models/iAreaInterna';

import { Subscription } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-area-interna',
  templateUrl: './editar-area-interna.component.html',
})
export class EditarAreaInternaComponent implements OnInit, OnDestroy {
  cargando = false;
  areaInterna: IAreaInterna;
  areaInternaId: string;
  usernameValido = false;
  //
  suscripcionUsername: Subscription;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _areaInternaService: AreaInternaService,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {
    if (this.suscripcionUsername) {
      this.suscripcionUsername.unsubscribe();
    }
  }

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.areaInternaId = params['id'];
      console.log('this.areaInternaId', this.areaInternaId);
      if (this.areaInternaId) {
        this.obtenerAreaInternaPorId();
      } else {
        // TODO: ContareaInternaar que fucnione y mostrar mensaje: 'El areaInterna solicitado no se encuentra disponible'
        this._router.navigate(['areaInternas']);
      }
    });
  }

  obtenerAreaInternaPorId() {
    this.cargando = true;
    this._areaInternaService
      .obtenertodos({ id: this.areaInternaId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.areaInterna = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IAreaInterna) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar un área interna, confirme esta operación.',
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
  actualizar(areaInterna: IAreaInterna) {
    this.cargando = true;
    this._areaInternaService
      .guardar({ ...areaInterna })
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['areaInternas']);
          });
        },
        error => {
          this.cargando = false;
          this._errorService.showMessage(error);
          console.log('[ERROR]', error);
        }
      );
  }
}
