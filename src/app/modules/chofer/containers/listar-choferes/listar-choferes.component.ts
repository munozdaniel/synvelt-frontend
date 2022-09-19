import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { ChoferService } from 'app/core/services/chofer.service';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IChofer } from 'app/models/iChofer';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
@UntilDestroy()
@Component({
  selector: 'app-listar-choferes',
  templateUrl: './listar-choferes.component.html',
  styleUrls: ['./listar-choferes.component.scss'],
})
export class ListarChoferesComponent implements OnInit {
  estadosEntidad: IEstadoEntidad[];
  cargando = false;
  parametros: any;
  choferes: IChofer[];
  areasInternas: IAreaInterna[];
  constructor(
    private _areaInternaService: AreaInternaService,
    private _choferService: ChoferService,
    private _router: Router,
    private _estadoEntidadService: EstadoEntidadService,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
    this.obtenerEstadosEntidad();
    this.obtenerAreasInternas();
  }
  obtenerEstadosEntidad() {
    this._estadoEntidadService
      .obtenerTodosCache()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.estadosEntidad = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  obtenerAreasInternas() {
    this._areaInternaService.obtenertodos().subscribe(areasInternas => {
      this.areasInternas = areasInternas;
    });
  }
  obtenerTodos() {
    this.cargando = true;
    this._choferService
      .obtenertodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.choferes = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['choferes/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['choferes/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Va a eliminar el área interna, confirme esta operación.',
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
    this._choferService
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
