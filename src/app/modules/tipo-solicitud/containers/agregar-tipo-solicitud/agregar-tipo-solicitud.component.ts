import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoSolicitudService } from 'app/core/services/tipo-solicitud.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoSolicitud } from 'app/models/iTipoSolicitud';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-agregar-tipo-solicitud',
  templateUrl: './agregar-tipo-solicitud.component.html',
})
export class AgregarTipoSolicitudComponent implements OnInit {
  cargando = false;
  estadosEntidad$: Observable<IEstadoEntidad[]> =
  this._estadoEntidadService.obtenerTodosCache();
  constructor(
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _tipoVehiculoService: TipoSolicitudService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {}
  setForm(evento: ITipoSolicitud) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message:
        'Está por guardar un nuevo tipo de solicitud, confirme esta operación.',
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
  guardar(areaInterna: ITipoSolicitud) {
    this.cargando = true;
    this._tipoVehiculoService
      .guardar(null, areaInterna)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['tipo-solicitudes']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar la tipo-solicitud',
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
