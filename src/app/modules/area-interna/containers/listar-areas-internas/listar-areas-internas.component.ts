import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
@UntilDestroy()
@Component({
  selector: 'app-listar-areas-internas',
  templateUrl: './listar-areas-internas.component.html',
})
export class ListarAreasInternasComponent implements OnInit {
  areasInternas: IAreaInterna[];
  cargando = false;
  parametros: any;
  constructor(
    private _areaInternaService: AreaInternaService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._areaInternaService
      .obtenertodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          console.log('datos', datos);
          this.cargando = false;
          this.areasInternas = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }
  redireccionarAsignar() {
    this._router.navigate(['areainternas/asignar']);
  }
  redireccionarAgregar() {
    this._router.navigate(['areainternas/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['areainternas/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: '¿Está seguro de continuar con la eliminación del área interna?',
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
    this._areaInternaService
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
