import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoVehiculoService } from 'app/core/services/tipo-vehiculo.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoVehiculo } from 'app/models/iTipoVehiculo';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-tipo-vehiculo',
  templateUrl: './editar-tipo-vehiculo.component.html',
})
export class EditarTipoVehiculoComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  tipoVehiculo: ITipoVehiculo;
  tipoVehiculoId: string;
  constructor(
    private _tipoVehiculoService: TipoVehiculoService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.tipoVehiculoId = params['id'];
      if (this.tipoVehiculoId) {
        this.obtenerTipoVehiculoPorId();
      } else {
        // TODO: ConttipoVehiculoar que fucnione y mostrar mensaje: 'El tipoVehiculo solicitado no se encuentra disponible'
        this._router.navigate(['tipo-vehiculo']);
      }
    });
  }
  obtenerTipoVehiculoPorId() {
    this.cargando = true;
    this._tipoVehiculoService
      .obtenerTodos({ id: this.tipoVehiculoId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.tipoVehiculo = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: ITipoVehiculo) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar un tipo de vehiculo, confirme esta operación.',
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
  actualizar(tipoVehiculo: ITipoVehiculo) {
    this.cargando = true;
    this._tipoVehiculoService
      .guardar(this.tipoVehiculoId, tipoVehiculo)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['tipo-vehiculo']);
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
