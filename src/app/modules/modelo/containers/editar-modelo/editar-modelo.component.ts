import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ModeloService } from 'app/core/services/modelo.service';
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
import { IModeloListaControl } from 'app/models/iModeloListaControl';
import { IModeloTipoDato } from 'app/models/iModeloTipoDato';
@UntilDestroy()
@Component({
  selector: 'app-editar-modelo',
  templateUrl: './editar-modelo.component.html',
  styleUrls: ['./editar-modelo.component.scss'],
})
export class EditarModeloComponent implements OnInit {
  modelosTipoDato: IModeloTipoDato[];
  modelo: IModeloListaControl;
  cargando = false;
  modeloId: number;
  modeloItems: IModeloItemListaControl[];
  constructor(
    private _activeRoute: ActivatedRoute,
    private _modeloService: ModeloService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.modeloId = params['id'];
      if (this.modeloId) {
        this.obtenerModeloPorId();
      } else {
        this.redireccionar();
      }
    });
    this.obtenerModeloTipoDato();
  }
  obtenerModeloTipoDato() {
    this._modeloService
      .obtenerModeloTipoDato()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.modelosTipoDato = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  obtenerModeloPorId() {
    this.cargando = true;
    this._modeloService
      .obtenerModelosListaControl({ id: this.modeloId, vigente: null })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          if (datos && datos.length > 0) {
            this.modelo = datos[0];
            this.obtenerModelosItemListaControl();
          } else {
            this.cargando = false;
            this.redireccionar();
          }
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }
  obtenerModelosItemListaControl() {
    this._modeloService
      .obtenerModelosItemListaControl({ idModeloListaControl: this.modelo.id })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.modeloItems = datos;
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  redireccionar() {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Modelo no encontrado',
      message: 'El modelo solicitado no se encontró en la base de datos',
      icon: {
        name: 'heroicons_solid:question-mark-circle',
        color: 'info',
      },
      actions: {
        confirm: {
          label: 'Aceptar',
          color: 'primary',
        },
        cancel: {
          label: 'Cancelar',
          show: false,
        },
      },
    });

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe(result => {
      this._router.navigate(['modelos']);
    });
  }
  setForm(evento: {
    modeloLista: IModeloListaControl;
    modeloItemLista: IModeloItemListaControl[];
  }) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por actualizar un modelo, confirme esta operación.',
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
        this.guardar(evento.modeloLista, evento.modeloItemLista);
      }
    });
  }
  guardar(
    modeloLista: IModeloListaControl,
    modeloItemLista: IModeloItemListaControl[]
  ) {
    this.cargando = true;
    this._modeloService
      .actualizacionModeloListaControl(modeloLista, modeloItemLista)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['modelos']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el modelo',
              error.error.error.message
            );
          } else {
            this._synveltConfirmationService.error();
          }
          console.log('[ERROR]', error);
        }
      );
  }
}
