import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { ModeloService } from 'app/core/services/modelo.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
import { IModeloListaControl } from 'app/models/iModeloListaControl';
import { IModeloTipoDato } from 'app/models/iModeloTipoDato';
import { IUsuario } from 'app/models/iUsuario';
@UntilDestroy()
@Component({
  selector: 'app-agregar-modelo',
  templateUrl: './agregar-modelo.component.html',
  styleUrls: ['./agregar-modelo.component.scss'],
})
export class AgregarModeloComponent implements OnInit, OnDestroy {
  //
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  modelosTipoDato: IModeloTipoDato[];
  constructor(
    private _modeloService: ModeloService,
    private _errorService: ErrorService,

    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
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

  setForm(evento: {
    modeloLista: IModeloListaControl;
    modeloItemLista: IModeloItemListaControl[];
  }) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar un nuevo modelo, confirme esta operación.',
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
            this._errorService.showMessage(error);
          }
          console.log('[ERROR]', error);
        }
      );
  }
}
