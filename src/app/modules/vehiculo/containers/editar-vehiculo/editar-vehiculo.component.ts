import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoVehiculoService } from 'app/core/services/tipo-vehiculo.service';
import { VehiculoService } from 'app/core/services/vehiculo.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoVehiculo } from 'app/models/ITipoVehiculo';
import { IVehiculo } from 'app/models/iVehiculo';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-vehiculo',
  templateUrl: './editar-vehiculo.component.html',
})
export class EditarVehiculoComponent implements OnInit {
  cargando = false;
  vehiculo: IVehiculo;
  vehiculoId: string;
  tipoVehiculo$: Observable<ITipoVehiculo[]>;
  estadosEntidad$: Observable<IEstadoEntidad[]> =
  this._estadoEntidadService.obtenerTodosCache();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _vehiculoService: VehiculoService,
    private _estadoEntidadService: EstadoEntidadService,
    private _tipoVehiculoService: TipoVehiculoService
  ) {}

  ngOnInit(): void {
    this.tipoVehiculo$ = this._tipoVehiculoService.obtenerTodos();
    this._activeRoute.params.subscribe(params => {
      this.vehiculoId = params['id'];
      if (this.vehiculoId) {
        this.obtenerVehiculoPorId();
      } else {
        // TODO: Contvehiculoar que fucnione y mostrar mensaje: 'El vehiculo solicitado no se encuentra disponible'
        this._router.navigate(['vehiculos']);
      }
    });
  }
  obtenerVehiculoPorId() {
    this.cargando = true;
    this._vehiculoService
      .obtenertodos({ id: this.vehiculoId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.vehiculo = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IVehiculo) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar una vehiculo, confirme esta operación.',
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
  actualizar(vehiculo: IVehiculo) {
    this.cargando = true;
    this._vehiculoService
      .guardar(this.vehiculoId, vehiculo)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['vehiculoes']);
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
