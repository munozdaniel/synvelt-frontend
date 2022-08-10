import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';

@UntilDestroy()
@Component({
  selector: 'app-agregar-rol',
  templateUrl: './agregar-rol.component.html',
})
export class AgregarRolComponent implements OnInit, OnDestroy {
  //
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  usuariosSeleccionados: IUsuario[];
  constructor(
    private _rolService: RolService,
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }
  obtenerUsuarios() {
    this.cargandoUsuario = true;
    this._usuarioService
      .buscar()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargandoUsuario = false;
          this.usuarios = datos;
        },
        error => {
          this.cargandoUsuario = false;
          console.log('[ERROR]', error);
        }
      );
  }
  setForm(evento: IRol) {
    if (this.usuariosSeleccionados?.length < 1) {
      this._synveltConfirmationService.open({
        title: 'Formulario Incompleto',
        message: 'Tiene que seleccionar al menos un usuario',

        actions: {
          confirm: {
            show: false,
            // label: 'Aceptar',
          },
          cancel: {
            show: true,
            label: 'Aceptar',
          },
        },
      });
    } else {
      // Open the confirmation and save the reference
      const dialogRef = this._synveltConfirmationService.open({
        title: 'Confirmar Operación',
        message: 'Está por guardar un nuevo rol, desea continuar?',
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
  }
  guardar(rol: IRol) {
    this.cargando = true;
    this._rolService
      .guardar(rol)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.cargando = false;
          const confirmation = this._synveltConfirmationService.success();
          confirmation.afterClosed().subscribe(() => {
            this._router.navigate(['rols']);
          });
        },
        error => {
          this.cargando = false;
          if (error && error.status === 409) {
            this._synveltConfirmationService.error(
              'Error al guardar el rol',
              error.error.error.message
            );
          } else {
            this._synveltConfirmationService.error();
          }
          console.log('[ERROR]', error);
        }
      );
  }
  setSelectUsuarios(evento: IUsuario[]) {
    this.usuariosSeleccionados = [...evento];
  }
}
