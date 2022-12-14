import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoVehiculoService } from 'app/core/services/tipo-vehiculo.service';
import { VehiculoService } from 'app/core/services/vehiculo.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoVehiculo } from 'app/models/ITipoVehiculo';
import { IVehiculo } from 'app/models/iVehiculo';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-listar-vehiculos',
  templateUrl: './listar-vehiculos.component.html',
})
export class ListarVehiculosComponent implements OnInit {
  cargando = false;
  parametros: any;
  vehiculos: IVehiculo[];
  estadosEntidad: IEstadoEntidad[];
  tipoVehiculos: ITipoVehiculo[];
  constructor(
    private _vehiculoService: VehiculoService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService,
    private _tipoVehiculoService: TipoVehiculoService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
    this.obtenerTiposVehiculo();
    this.obtenerEstadosEntidad();
  }
  obtenerTiposVehiculo() {
    this._tipoVehiculoService
      .obtenerTodos()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.tipoVehiculos = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  obtenerEstadosEntidad() {
    this._estadoEntidadService
      .obtenerTodosCache()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.estadosEntidad = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  obtenerTodos() {
    this.cargando = true;
    this._vehiculoService
      .obtenertodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.vehiculos = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['vehiculos/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['vehiculos/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operaci??n',
      message: 'Va a eliminar el ??rea interna, confirme esta operaci??n.',
      icon: {
        show: true,
        name: 'heroicons_outline:exclamation',
        color: 'warn',
      },
      actions: {
        confirm: {
          show: true,
          label: 'Eliminar',
          color: 'warn',
        },
        cancel: {
          show: true,
          label: 'Cancelar',
        },
      },
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe(result => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        this.confirmarEliminar(evento);
      }
    });
  }
  confirmarEliminar(id: string) {
    this.cargando = true;
    this._vehiculoService
      .eliminar(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          this._synveltConfirmationService.success();
          this.obtenerTodos();
        },
        error => {
          this._synveltConfirmationService.error();
          this.cargando = false;

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(parametros) {
    this.parametros = parametros;
    this.obtenerTodos();
  }
}
