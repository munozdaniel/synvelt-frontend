import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { LocalidadService } from 'app/core/services/localidad.service';
import { ILocalidad } from 'app/models/iLocalidad';
@UntilDestroy()
@Component({
  selector: 'app-agregar-localidad',
  templateUrl: './agregar-localidad.component.html',
  styleUrls: ['./agregar-localidad.component.scss'],
})
export class AgregarLocalidadComponent implements OnInit {
  cargando = false;

  constructor(
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _localidadService: LocalidadService
  ) {}

  ngOnInit(): void {}
  setForm(evento: ILocalidad) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message:
        'Está por guardar una nueva localidad, confirme esta operación.',
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
  guardar(areaInterna: ILocalidad) {
    this.cargando = true;
    this._localidadService
      .guardar(null, areaInterna)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['localidades']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar la localidad',
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
