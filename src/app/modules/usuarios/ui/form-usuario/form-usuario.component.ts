import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUsuario } from 'app/models/iUsuario';
import { synveltAnimations } from '@synvelt/animations';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  animations: [synveltAnimations],
})
export class FormUsuarioComponent implements OnInit, OnChanges {
  @Input() cargando: boolean;
  @Input() usuario?: IUsuario;
  @Output() retForm = new EventEmitter<IUsuario>();
  @Output() retUsernameExiste = new EventEmitter<any>();

  form: FormGroup;
  esEditar = false;

  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuario && changes.usuario.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      Id: [null, []],
      Nombre: [null, [Validators.required]],
      Apellido: [null, [Validators.required]],
      ClaveLogin: ['', []],
      Cuil: ['', []],
      DireccionMail: ['', []],
      FechaUtcActualizacion: ['', []],
      IdInspector: ['', []],
      IdRolPrincipal: ['', []],
      NombreLogin: ['', []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.usuario);
    }
  }

  //   Fin:Autocomplete

  guardar(): void {
    if (this.form.invalid) {
      this._synveltConfirmationService.open({
        title: 'Formulario Incompleto',
        message: 'Verifique que se hayan ingresado todos los datos requeridos.',

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
      this.retForm.emit(this.form.value);
    }
  }
}
