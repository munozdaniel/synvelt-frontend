import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
})
export class AgregarUsuarioComponent implements OnInit, OnDestroy {
  //
  cargando = false;
  roles$: Observable<IRol[]>;
  areasInternas$: Observable<IAreaInterna[]>;

  constructor(
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _areaInternaService: AreaInternaService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerAreasInternas();
  }
  obtenerAreasInternas() {
    this.areasInternas$ = this._areaInternaService.obtenertodos();
  }

  obtenerRoles() {
    this.roles$ = this._rolService.obtenertodos();
  }
  setForm(evento: IUsuario) {
    // Open the confirmation and save the reference
    const dialogRef = this._synveltConfirmationService.open({
      title: 'Confirmar operación',
      message: 'Está por guardar un nuevo usuario, confirme esta operación.',
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
      if (result === 'confirmed') {
        this.guardar(evento);
      }
    });
  }
  guardar(usuario: IUsuario) {
    this.cargando = true;
    this._usuarioService
      .guardar(usuario)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['usuarios']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el usuario',
              error.error.error.message
            );
          } else {
            this._synveltConfirmationService.error();
          }
          console.log('[ERROR]', error);
        }
      );
  }
}
