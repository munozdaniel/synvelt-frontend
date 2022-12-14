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
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IRol } from 'app/models/iRol';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-filtro-usuarios',
  templateUrl: './filtro-usuarios.component.html',
})
export class FiltroUsuariosComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Input() roles: IRol[];
  @Input() areasInternas: IAreaInterna[];
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredRoles: Observable<IRol[]>;
  filteredAreas: Observable<IAreaInterna[]>;
  areaIndistinta = { id: null, nombre: '', codigo: 'N/A' };
  rolIndistinto = { id: null, nombre: '', codigo: 'N/A' };
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.roles && changes.roles.currentValue) {
      this.setAutocompleteRoles();
    }
    if (changes.areasInternas && changes.areasInternas.currentValue) {
      this.setAutocompleteAreasInternas();
    }
  }
  /** CAMPOS FILTRO Y ORDEN
   *
   * CUIT - Nombre del Usuario - Área Municipal -
   * Perfil Asignado - Estado
   *
   */
  ngOnInit(): void {
    this.form = this._fb.group({
      nombre: [null],
      //   apellido: [null],
      estado: [null],
      cuil: [null],
      rol: [null],
      areaInterna: [null],
      //   apellido: [null],
    });
  }
  //  Autocomplete
  setAutocompleteAreasInternas() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteAreasInternas();
      }, 1000);
    } else {
      this.filteredAreas = this.form.controls.areaInterna.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value?.nombre)),
        map(name =>
          name ? this._filterAreas(name) : this.areasInternas.slice()
        )
      );
    }
  }
  private _filterAreas(name: string): IAreaInterna[] {
    const filterValue = name.toLowerCase();

    return this.areasInternas.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnArea(objeto: IAreaInterna): string {
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
        map(value => (typeof value === 'string' ? value : value?.nombre)),
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
  limpiar() {
    this.form.reset();
    this.retFiltros.emit(null);
  }
  filtrar() {
    if (this.form.invalid) {
      this._synveltConfirmationService.open({
        title: 'Formulario incompleto',
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
      //   idAreaInterna: [null],
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
      if (parametros.areaInterna) {
        filtros.idAreaInterna = parametros.areaInterna.id;
      }

      this.retFiltros.emit(filtros);
    }
  }
}
