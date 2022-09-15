import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-agregar-pregunta',
  templateUrl: './agregar-pregunta.component.html',
})
export class AgregarPreguntaFrecuenteComponent implements OnInit {
  cargando = false;
  estadosEntidad$: Observable<IEstadoEntidad[]> =
    this._estadoEntidadService.obtenerTodosCache();
  constructor(
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _preguntaFrecuenteService: PreguntaFrecuenteService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {}
  //   obtenerEstadosEntidad() {
  //     this._estadoEntidadService
  //       .obtenerTodosCache()
  //       .pipe(untilDestroyed(this))
  //       .subscribe(
  //         datos => {
  //           this.estadosEntidad = datos;
  //         },
  //         error => {
  //           console.log('[ERROR]', error);
  //         }
  //       );
  //   }
  setForm(evento: IPreguntaFrecuente) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar una nueva pregunta, confirme esta operación.',
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
  guardar(areaInterna: IPreguntaFrecuente) {
    this.cargando = true;
    this._preguntaFrecuenteService
      .guardar(null, areaInterna)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['preguntas']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar la pregunta',
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
