import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ModeloService } from 'app/core/services/modelo.service';
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
@UntilDestroy()
@Component({
  selector: 'app-listar-modelos',
  templateUrl: './listar-modelos.component.html',
})
export class ListarModelosComponent implements OnInit {
  modelosItem: IModeloItemListaControl[];
  cargando = false;
  parametros: any;
  constructor(
    private _modeloService: ModeloService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._modeloService
      .obtenerModelosItemListaControl(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          console.log('datos', datos);
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
      title: 'Confirmar Operación',
      message: '¿Está seguro de continuar con la eliminación del modelo?',
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
    alert('pendiente');
    // this._modeloService
    //   .eliminar(id)
    //   .pipe(untilDestroyed(this))
    //   .subscribe(
    //     () => {
    //       this.cargando = false;
    //       this._synveltConfirmationService.success();
    //       this.obtenerTodos();
    //     },
    //     error => {
    //       this._synveltConfirmationService.error();

    //       console.log('[ERROR]', error);
    //     }
    //   );
  }
  setFiltros(parametros) {
    this.parametros = parametros;
    this.obtenerTodos();
  }
}
