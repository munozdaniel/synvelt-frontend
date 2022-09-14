import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { LocalidadService } from 'app/core/services/localidad.service';
import { ILocalidad } from 'app/models/iLocalidad';
@UntilDestroy()
@Component({
  selector: 'app-listar-localidades',
  templateUrl: './listar-localidades.component.html',
  styleUrls: ['./listar-localidades.component.scss'],
})
export class ListarLocalidadesComponent implements OnInit {
  cargando = false;
  parametros: any;
  localidades: ILocalidad[];
  constructor(
    private _localidadService: LocalidadService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._localidadService
      .obtenertodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          this.localidades = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }

  redireccionarAgregar() {
    this._router.navigate(['localidades/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['localidades/editar', evento]);
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
    this._localidadService
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
