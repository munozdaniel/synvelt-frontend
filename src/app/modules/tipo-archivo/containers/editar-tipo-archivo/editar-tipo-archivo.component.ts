import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { TipoArchivoService } from 'app/core/services/tipo-archivo-adjunto.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoArchivo } from 'app/models/iTipoArchivoAdjunto';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-tipo-archivo',
  templateUrl: './editar-tipo-archivo.component.html',
})
export class EditarTipoArchivoComponent implements OnInit {
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  cargando = false;
  tipoArchivo: ITipoArchivo;
  tipoArchivoId: string;
  constructor(
    private _tipoArchivoService: TipoArchivoService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.tipoArchivoId = params['id'];
      if (this.tipoArchivoId) {
        this.obtenerTipoArchivoPorId();
      } else {
        // TODO: ConttipoArchivoar que fucnione y mostrar mensaje: 'El tipoArchivo solicitado no se encuentra disponible'
        this._router.navigate(['tipo-archivos']);
      }
    });
  }
  obtenerTipoArchivoPorId() {
    this.cargando = true;
    this._tipoArchivoService
      .obtenerTodos({ id: this.tipoArchivoId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.tipoArchivo = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: ITipoArchivo) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar una tipoArchivo, confirme esta operación.',
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
  actualizar(tipoArchivo: ITipoArchivo) {
    this.cargando = true;
    this._tipoArchivoService
      .guardar(this.tipoArchivoId, tipoArchivo)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['tipo-archivo']);
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
