import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { PreguntaFrecuenteService } from 'app/core/services/pregunta.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { IPreguntaFrecuente } from 'app/models/iPreguntaFrecuente';
import { Observable } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-editar-pregunta',
  templateUrl: './editar-pregunta.component.html',
})
export class EditarPreguntaFrecuenteComponent implements OnInit {
  cargando = false;
  pregunta: IPreguntaFrecuente;
  preguntaId: string;
  estadosEntidad$: Observable<IEstadoEntidad[]> =
  this._estadoEntidadService.obtenerTodosCache();
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _preguntaService: PreguntaFrecuenteService,
    private _estadoEntidadService: EstadoEntidadService

  ) {}

  ngOnInit(): void {

    this._activeRoute.params.subscribe(params => {
      this.preguntaId = params['id'];
      if (this.preguntaId) {
        this.obtenerPreguntaFrecuentePorId();
      } else {
        // TODO: Contpreguntaar que fucnione y mostrar mensaje: 'El pregunta solicitado no se encuentra disponible'
        this._router.navigate(['preguntas']);
      }
    });
  }

  obtenerPreguntaFrecuentePorId() {
    this.cargando = true;
    this._preguntaService
      .obtenertodos({ id: this.preguntaId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.pregunta = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IPreguntaFrecuente) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar una pregunta, confirme esta operación.',
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
  actualizar(pregunta: IPreguntaFrecuente) {
    this.cargando = true;
    this._preguntaService
      .guardar(this.preguntaId, pregunta)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['preguntaes']);
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
