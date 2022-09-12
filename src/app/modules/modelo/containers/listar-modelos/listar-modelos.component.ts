import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ModeloService } from 'app/core/services/modelo.service';
import { IModeloListaControl } from 'app/models/iModeloListaControl';
import { IModeloTipoDato } from 'app/models/iModeloTipoDato';
@UntilDestroy()
@Component({
  selector: 'app-listar-modelos',
  templateUrl: './listar-modelos.component.html',
})
export class ListarModelosComponent implements OnInit {
  modelosItem: IModeloListaControl[];
  cargando = false;
  parametros: any;
  modelosTipoDato: IModeloTipoDato[];
  constructor(
    private _modeloService: ModeloService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  test() {
    this._modeloService
      .actualizacionModeloListaControl(null, null)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.obtenerTodos();
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  ngOnInit(): void {
    this.obtenerTodos();
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
  obtenerTodos() {
    this.cargando = true;
    this._modeloService
      .obtenerModelosListaControl(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.modelosItem = datos;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }
  redireccionarAsignar() {
    this._router.navigate(['modelos/asignar']);
  }
  redireccionarAgregar() {
    this._router.navigate(['modelos/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['modelos/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por eliminar un modelo de lista, confirme esta operación.',
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
    this._modeloService
      .eliminar(id)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos) {
            this._synveltConfirmationService.success();
            this.obtenerTodos();
          } else {
            this._synveltConfirmationService.error();
          }
        },
        error => {
          this._synveltConfirmationService.error();

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(parametros) {
    console.log('parametros', parametros);
    this.parametros = parametros;
    this.obtenerTodos();
  }
  setObtenerModeloItem(modelo: IModeloListaControl) {
    modelo.cargando = true;
    this.obtenerModeloItemsLista(modelo);
  }
  obtenerModeloItemsLista(modelo: IModeloListaControl) {
    this._modeloService
      .obtenerModelosItemListaControl({ idModeloListaControl: modelo.id })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          modelo.cargando = false;
          console.log('datos', datos);
          modelo.items = datos.map(x => ({
            ...x,
            modeloTipoDato: this.modelosTipoDato.find(
              m => m.id === x.idModeloTipoDato
            ),
          }));
        },
        error => {
          modelo.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
}
