import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { ChoferService } from 'app/core/services/chofer.service';
import { IChofer } from 'app/models/iChofer';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
@UntilDestroy()
@Component({
  selector: 'app-agregar-chofer',
  templateUrl: './agregar-chofer.component.html',
  styleUrls: ['./agregar-chofer.component.scss'],
})
export class AgregarChoferComponent implements OnInit {
  cargando = false;
  areasInternas: IAreaInterna[];
  estadosEntidad: IEstadoEntidad[];

  constructor(
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _choferService: ChoferService,
    private _estadoEntidadService: EstadoEntidadService,
    private _areaInternaService: AreaInternaService
  ) {}

  ngOnInit(): void {
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
  setForm(evento: IChofer) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar un nuevo chofer, confirme esta operación.',
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
  guardar(areaInterna: IChofer) {
    this.cargando = true;
    this._choferService
      .guardar(null, areaInterna)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['choferes']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar la chofer',
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
