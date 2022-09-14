import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { ErrorService } from 'app/core/services/error.service';
import { LocalidadService } from 'app/core/services/localidad.service';
import { ILocalidad } from 'app/models/iLocalidad';
@UntilDestroy()
@Component({
  selector: 'app-editar-localidad',
  templateUrl: './editar-localidad.component.html',
  styleUrls: ['./editar-localidad.component.scss'],
})
export class EditarLocalidadComponent implements OnInit {
  cargando = false;
  localidad: ILocalidad;
  localidadId: number;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _errorService: ErrorService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _localidadService: LocalidadService
  ) {}

  ngOnInit(): void {
    this._activeRoute.params.subscribe(params => {
      this.localidadId = params['id'];
      if (this.localidadId) {
        this.obtenerLocalidadPorId();
      } else {
        // TODO: Contlocalidadar que fucnione y mostrar mensaje: 'El localidad solicitado no se encuentra disponible'
        this._router.navigate(['localidads']);
      }
    });
  }
  obtenerLocalidadPorId() {
    this.cargando = true;
    this._localidadService
      .obtenertodos({ id: this.localidadId })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargando = false;
          if (datos && datos.length > 0) {
            this.localidad = datos[0];
          }
        },
        error => {
          this.cargando = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: ILocalidad) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por editar una localidad, confirme esta operación.',
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
  actualizar(localidad: ILocalidad) {
    this.cargando = true;
    this._localidadService
      .guardar({ ...localidad })
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['localidades']);
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
