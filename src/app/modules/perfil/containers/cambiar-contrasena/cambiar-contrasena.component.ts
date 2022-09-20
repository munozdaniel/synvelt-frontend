import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { UsuarioService } from 'app/core/services/usuario.service';
import { UserService } from 'app/core/user/user.service';
import { IUsuario } from 'app/models/iUsuario';
import { CustomValidators } from 'app/shared/utils/custom-validators';
import { MustMatchValidator } from 'app/shared/utils/must-match.validator';
import { Subject, takeUntil } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.scss'],
})
export class CambiarContrasenaComponent implements OnInit, OnDestroy {
  hide = true;
  hide2 = true;
  hide3 = true;
  registerForm: FormGroup;
  submitted = false;
  cargando = false;
  usuarioId = null;
  nombre: string;
  user: IUsuario;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit() {
    // Subscribe to user changes
    this._userService.user$
      .pipe(untilDestroyed(this))
      .subscribe((user: IUsuario) => {
        this.user = user;
      });
    // this._route.params.forEach((params: Params) => {
    //   const usuarioId = params['usuarioId'];
    //   if (usuarioId) {
    //     this.usuarioId = usuarioId;
    //   }else{
    //     // Mostrar mensaje de que no hay usuarioId
    //   }
    // });
    this.registerForm = this._fb.group(
      {
        password: [
          null,
          Validators.compose([
            Validators.required,
            // // check whether the entered password has a number
            // CustomValidators.patternValidator(/\d/, {
            //   hasNumber: true,
            // }),
            // // check whether the entered password has upper case letter
            // CustomValidators.patternValidator(/[A-Z]/, {
            //   hasCapitalCase: true,
            // }),
            // // check whether the entered password has a lower case letter
            // CustomValidators.patternValidator(/[a-z]/, {
            //   hasSmallCase: true,
            // }),
            // // check whether the entered password has a special character
            // CustomValidators.patternValidator(
            //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            //   {
            //     hasSpecialCharacters: true,
            //   }
            // ),
            // Validators.minLength(8),
          ]),
        ],
        confirmPassword: [null, Validators.compose([Validators.required])],
      },
      {
        validator: MustMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.cargando = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this._synveltConfirmationService.open({
        title: 'Formulario incompleto',
        message:
          'Verifique que todos los campos del formulario hayan sido cargados y que las contraseñas sean iguales.',
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
      return;
    } else {
      const confirmation = this._synveltConfirmationService.open({
        title: 'Confirmar operación',
        message: 'Está por cambiar la contraseña, confirme esta operación.',
        icon: {
          show: true,
          name: 'heroicons_outline:exclamation',
          color: 'warn',
        },
        actions: {
          confirm: {
            show: true,
            label: 'Confirmar',
            color: 'primary',
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
          this.confirmarOperacion();
        }
      });
    }

    //   .setPassword(
    //     this.registerForm.controls.oldPassword.value,
    //     usuarioID,
    //     this.registerForm.controls.password.value
    //   )
    //   .subscribe(
    //     datos => {
    //       if (datos && datos.status === 'error') {
    //         Swal.fire({
    //           title: 'Ups! Hay un problema',
    //           text: datos.message,
    //           icon: 'error',
    //           focusConfirm: true,
    //           confirmButtonText: 'Aceptar',
    //         });
    //       } else {
    //         this.onReset();
    //         Swal.fire({
    //           title: 'Operación exitosa',
    //           text: 'El password fue modificado correctamente',
    //           icon: 'success',
    //           focusConfirm: true,
    //           confirmButtonText: 'Aceptar',
    //         });
    //       }

    //       this.cargando = false;
    //     },
    //     error => {
    //       this.cargando = false;
    //       console.log('[ERROR]', error);
    //       Swal.fire({
    //         title: 'Ups! Hay un problema',
    //         text: 'No se pudo cambiar la contraseña. Intentelo nuevamente, si el problema persiste comuniquese con el soporte técnico.',
    //         icon: 'error',
    //         focusConfirm: true,
    //         confirmButtonText: 'Aceptar',
    //       });
    //     }
    //   );
  }
  confirmarOperacion() {
    const idUsuario = this.user.id;
    this._usuarioService
      .actualizarPassword({
        idUsuario,
        claveLogin: this.registerForm.controls.password.value,
      })
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          if (datos) {
            this._synveltConfirmationService.success();
          } else {
            this._synveltConfirmationService.error();
          }
          this.cargando = false;
        },
        error => {
          this.cargando = false;
          this._synveltConfirmationService.error();
          console.log('[ERROR]', error);
        }
      );
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
