import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IRol } from 'app/models/iRol';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
})
export class FiltroUsuariosComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Input() roles: IRol[];
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredRoles: Observable<IRol[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.roles && changes.roles.currentValue) {
      this.setAutocompleteRoles();
    }
  }
  /** CAMPOS FILTRO Y ORDEN
   *
   * CUIT - Nombre del Usuario - Área Municipal -
   * Perfil Asignado - Estado
   */
  ngOnInit(): void {
    this.form = this._fb.group({
      nombre: [null],
    //   apellido: [null],
      estado: [null],
      cuil: [null],
      rol: [null],
      areaMunicipal: [null],
      //   apellido: [null],
    });
  }
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
  limpiar() {
    this.form.reset();
    this.retFiltros.emit(null);
  }
  filtrar() {
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
      //     id: [null],
      //   nombreCompleto: [null],
      //   estado: [null],
      //   cuit: [null],
      //   rol: [null],
      //   areaMunicipal: [null],
      const parametros = this.form.value;
      const filtros: any = {};

      if (parametros.nombre) {
        filtros.nombreCompleto = parametros.nombre;
      }
    //   if (parametros.apellido) {
    //     filtros.apellido = parametros.apellido;
    //   }
      if (parametros.estado) {
        filtros.activo = parametros.estado === 'ACTIVO' ? true : false;
      }

      if (parametros.cuil) {
        filtros.cuil = parametros.cuil;
      }
      if (parametros.rol) {
        filtros.idRolPrincipal = parametros.rol ? parametros.rol.id : null;
      }
      if (parametros.areaMunicipal) {
        filtros.areaMunicipal = parametros.areaMunicipal;
      }

      this.retFiltros.emit(filtros);
    }
  }
}
