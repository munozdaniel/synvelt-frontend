import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { IRol } from 'app/models/iRol';
@UntilDestroy()
@Component({
  selector: 'app-listar-roles',
  templateUrl: './listar-roles.component.html',
})
export class ListarRolesComponent implements OnInit {
  roles: IRol[];
  cargando = false;
  parametros: any;
  constructor(
    private _rolService: RolService,
    private _router: Router,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  ngOnInit(): void {
    this.obtenerTodos();
  }

  obtenerTodos() {
    this.cargando = true;
    this._rolService
      .obtenertodos(this.parametros)
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          console.log('datos', datos);
          this.cargando = false;
          this.roles = datos as any;
        },
        error => {
          console.log('[ERROR]', error);
          this.cargando = false;
        }
      );
  }
  redireccionarAsignar() {
    this._router.navigate(['roles/asignar']);
  }
  redireccionarAgregar() {
    this._router.navigate(['roles/nuevo']);
  }
  setEditar(evento: string) {
    this._router.navigate(['roles/editar', evento]);
  }
  setEliminar(evento: string) {
    const confirmation = this._synveltConfirmationService.open({
      title: 'Confirmar Operación',
      message: '¿Está seguro de continuar con la eliminación del rol?',
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
    this._rolService
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
    console.log('setFiltros', parametros);
    this.parametros = parametros;
    this.obtenerTodos();
  }
}
