import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoSolicitudService } from 'app/core/services/tipo-solicitud.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoSolicitud } from 'app/models/iTipoSolicitud';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-listar-tipos-vehiculo',
  templateUrl: './listar-tipo-solicitudes.component.html',
})
export class ListarTiposSolicitudComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  parametros: any;
  tiposSolicitud: ITipoSolicitud[];
  estadosEntidad: IEstadoEntidad[];
  constructor(
    private _tipoSolicitudService: TipoSolicitudService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._tipoSolicitudService
      .obtenerTodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.tiposSolicitud = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['tipo-solicitud/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['tipo-solicitud/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Va a eliminar el tipo de solicitud, confirme esta operación.',
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
    this._tipoSolicitudService
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
