import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { ChoferService } from 'app/core/services/chofer.service';
import { IChofer } from 'app/models/iChofer';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { EstadoEntidadService } from 'app/core/services/estado-entidad.service';
@UntilDestroy()
@Component({
  selector: 'app-editar-chofer',
  templateUrl: './editar-chofer.component.html',
  styleUrls: ['./editar-chofer.component.scss'],
})
export class EditarChoferComponent implements OnInit {
  cargando = false;
  chofer: IChofer;
  choferId: string;
  areasInternas: IAreaInterna[];
  estadosEntidad: IEstadoEntidad[];
  constructor(
    private _areaInternaService: AreaInternaService,
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _choferService: ChoferService,
    private _estadoEntidadService: EstadoEntidadService
  ) {}

  ngOnInit(): void {
    this.obtenerEstadosEntidad();
    this.obtenerAreasInternas();
    this._activeRoute.params.subscribe(params => {
      this.choferId = params['id'];
      if (this.choferId) {
        this.obtenerChoferPorId();
      } else {
        // TODO: Contchoferar que fucnione y mostrar mensaje: 'El chofer solicitado no se encuentra disponible'
        this._router.navigate(['chofers']);
      }
    });
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
  obtenerChoferPorId() {
    this.cargando = true;
    this._choferService
      .obtenertodos({ id: this.choferId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.chofer = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IChofer) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar una chofer, confirme esta operación.',
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
        this.actualizar(evento);
      }
    });
  }
  actualizar(chofer: IChofer) {
    this.cargando = true;
    this._choferService
      .guardar(this.choferId, chofer)
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
          this._errorService.showMessage(error);
          console.log('[ERROR]', error);
        }
      );
  }
}
