import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoArchivoService } from 'app/core/services/tipo-archivo-adjunto.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoArchivo } from 'app/models/iTipoArchivoAdjunto';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-listar-tipos-archivo',
  templateUrl: './listar-tipo-archivos.component.html',
})
export class ListarTiposArchivoComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  parametros: any;
  tiposArchivo: ITipoArchivo[];
  constructor(
    private _tipoArchivoService: TipoArchivoService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._tipoArchivoService
      .obtenerTodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.tiposArchivo = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['tipo-archivo/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['tipo-archivo/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Va a eliminar el tipo de archivo, confirme esta operación.',
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
    this._tipoArchivoService
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
