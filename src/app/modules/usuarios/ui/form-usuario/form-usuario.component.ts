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
import { Observable, startWith, map } from 'rxjs';
import { IRol } from 'app/models/iRol';
import { IAreaInterna } from 'app/models/iAreaInterna';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  animations: [synveltAnimations],
})
export class FormUsuarioComponent implements OnInit, OnChanges {
  @Input() cargando: boolean;
  @Input() usuario?: IUsuario;
  @Input() roles: IRol[];
  @Input() areasInternas: IAreaInterna[];
  @Output() retForm = new EventEmitter<IUsuario>();
  @Output() retUsernameExiste = new EventEmitter<any>();

  form: FormGroup;
  esEditar = false;
  filteredRoles: Observable<IRol[]>;
  filteredAreasInternas: Observable<IAreaInterna[]>;

  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuario && changes.usuario.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
    if (changes.roles && changes.roles.currentValue) {
      this.setAutocompleteRoles();
    }
    if (changes.filteredAreasInternas && changes.filteredAreasInternas.currentValue) {
      this.setAutocompleteRoles();
    }

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this._fb.group({
      id: [null, []],
      nombre: [null, [Validators.required, Validators.maxLength(20)]],
      apellido: [null, [Validators.required, Validators.maxLength(30)]],
      cuil: ['', [Validators.maxLength(11)]],
      direccionMail: ['', [Validators.email, Validators.maxLength(256)]],
      telefono: ['', [Validators.maxLength(12)]],
      rol: ['', []],
      areaInterna: ['', []],
      esInspector: ['', []],
      comentario: ['', [Validators.maxLength(4000)]],

      nombreLogin: ['', []], // se saca del cuit
      claveLogin: ['', []],

      //   nroLegajo: ['', []],
      //   idInspector: ['', []],
      //   idAreaInterna: ['', []],
    });
  }
    //  Autocomplete
    setAutocompleteAreaInterna() {
        if (!this.form) {
          setTimeout(() => {
            this.setAutocompleteAreaInterna();
          }, 1000);
        } else {
          this.filteredAreasInternas = this.form.controls.areaInterna.valueChanges.pipe(
            startWith(''),
            map(value => (typeof value === 'string' ? value : value.nombre)),
            map(name => (name ? this._filterAreaInterna(name) : this.areasInternas.slice()))
          );
        }
      }
      private _filterAreaInterna(name: string): IAreaInterna[] {
        const filterValue = name.toLowerCase();

        return this.areasInternas.filter(option => {
          const nombreCompleto = option.nombre;
          // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
          return nombreCompleto.toLowerCase().includes(filterValue);
        });
      }
      displayFnAreaInterna(objeto: IAreaInterna): string {
        return objeto && objeto.nombre ? objeto.nombre : '';
      }
      //   Fin: Autocomplete
  //  Autocomplete
  setAutocompleteRoles() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteRoles();
      }, 1000);
    } else {
      this.filteredRoles = this.form.controls.rol.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(name => (name ? this._filterRol(name) : this.roles.slice()))
      );
    }
  }
  private _filterRol(name: string): IRol[] {
    const filterValue = name.toLowerCase();

    return this.roles.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnRol(objeto: IRol): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
  //   Fin: Autocomplete
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
      const usuario = this.form.value;
      usuario.nombreLogin = usuario.cuil;
      usuario.idRolPrincipal = usuario.rol?.id;
      this.retForm.emit(this.form.value);
    }
  }
}
