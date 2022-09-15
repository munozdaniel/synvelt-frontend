import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoVehiculoService } from 'app/core/services/tipo-vehiculo.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoVehiculo } from 'app/models/iTipoVehiculo';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-listar-tipos-vehiculo',
  templateUrl: './listar-tipo-vehiculos.component.html',
})
export class ListarTiposVehiculoComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  parametros: any;
  tiposVehiculo: ITipoVehiculo[];
  constructor(
    private _tipoVehiculoService: TipoVehiculoService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._tipoVehiculoService
      .obtenerTodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.tiposVehiculo = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['tipos-vehiculo/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['tipos-vehiculo/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Va a eliminar el tipo de vehiculo, confirme esta operación.',
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
    this._tipoVehiculoService
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

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(parametros) {
    this.parametros = parametros;
    this.obtenerTodos();
  }
}
