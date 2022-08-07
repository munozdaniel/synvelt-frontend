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

import { synveltAnimations } from '@synvelt/animations';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { Observable, startWith, map } from 'rxjs';
import { IRol } from 'app/models/iRol';

@Component({
  selector: 'app-form-rol',
  templateUrl: './form-rol.component.html',
  animations: [synveltAnimations],
})
export class FormRolComponent implements OnInit, OnChanges {
  @Input() cargando: boolean;
  @Input() rol?: IRol;
  @Output() retForm = new EventEmitter<IRol>();
  @Output() retUsernameExiste = new EventEmitter<any>();

  form: FormGroup;
  esEditar = false;
  filteredRoles: Observable<IRol[]>;

  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rol && changes.rol.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      descripcion: [null, []],
      esAdministradorDatos: ['', []],
      esAdministradorAplicacion: ['', []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.rol);
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
      const rol = this.form.value;
      rol.nombreLogin = rol.cuil;
      rol.idRolPrincipal = rol.rol?.id;
      this.retForm.emit(this.form.value);
    }
  }
}
