import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-editar-tipo-solicitud',
  templateUrl: './editar-tipo-solicitud.component.html',
})
export class EditarTipoSolicitudComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  tipoSolicitud: ITipoSolicitud;
  tipoSolicitudId: string;
  constructor(
    private _tipoSolicitudService: TipoSolicitudService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.tipoSolicitudId = params['id'];
      if (this.tipoSolicitudId) {
        this.obtenerTipoSolicitudPorId();
      } else {
        // TODO: ConttipoSolicitudar que fucnione y mostrar mensaje: 'El tipoSolicitud solicitado no se encuentra disponible'
        this._router.navigate(['tipo-solicitud']);
      }
    });
  }
  obtenerTipoSolicitudPorId() {
    this.cargando = true;
    this._tipoSolicitudService
      .obtenerTodos({ id: this.tipoSolicitudId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.tipoSolicitud = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: ITipoSolicitud) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar un tipo de solicitud, confirme esta operación.',
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
        this.actualizar(evento);
      }
    });
  }
  actualizar(tipoSolicitud: ITipoSolicitud) {
    this.cargando = true;
    this._tipoSolicitudService
      .guardar(this.tipoSolicitudId, tipoSolicitud)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['tipo-solicitud']);
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
