import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-filtro-choferes',
  templateUrl: './filtro-choferes.component.html',
  styleUrls: ['./filtro-choferes.component.scss'],
})
export class FiltroChoferesComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() areasInternas: IAreaInterna[];
  @Input() cargando = false;
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;

  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  filteredAreas: Observable<IAreaInterna[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estadosEntidad && changes.estadosEntidad.currentValue) {
      this.setAutocompleteEstadoEntidad();
    }
    if (changes.areasInternas && changes.areasInternas.currentValue) {
      this.setAutocompleteAreasInternas();
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
      areaInterna: [null],
      estadoEntidad: [null],
    });
  }
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
        filtros.nombre = parametros.nombre;
      }
      if (parametros.areaInterna) {
        filtros.areaInterna = parametros.areaInterna;
      }
      if (parametros.estadoEntidad) {
        filtros.estadoEntidad = parametros.estadoEntidad;
      }

      this.retFiltros.emit(filtros);
    }
  }
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
  setAutocompleteEstadoEntidad() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteEstadoEntidad();
      }, 1000);
    } else {
      this.filteredEstadoEntidad =
        this.form.controls.estadoEntidad.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.nombre)),
          map(name =>
            name ? this._filterEstadoEntidad(name) : this.estadosEntidad.slice()
          )
        );
    }
  }
  private _filterEstadoEntidad(name: string): IEstadoEntidad[] {
    const filterValue = name.toLowerCase();

    return this.estadosEntidad.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnEstadoEntidad(objeto: IEstadoEntidad): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
}
