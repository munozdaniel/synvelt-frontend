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
import { ITipoVehiculo } from 'app/models/ITipoVehiculo';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-filtro-vehiculos',
  templateUrl: './filtro-vehiculos.component.html',
})
export class FiltroVehiculosComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() tipoVehiculos: ITipoVehiculo[];
  @Input() cargando = false;
  @Output() retFiltros = new EventEmitter<any>();
  //
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  filteredTipoVehiculo: Observable<IEstadoEntidad[]>;

  //
  form: FormGroup;
  filteredAreasInternas: Observable<IAreaInterna[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estadosEntidad && changes.estadosEntidad.currentValue) {
      this.setAutocompleteEstadoEntidad();
    }
    if (changes.tipoVehiculos && changes.tipoVehiculos.currentValue) {
      this.setAutocompleteTipoVehiculo();
    }
  }
  /**
   *
   */
  ngOnInit(): void {
    this.form = this._fb.group({
      marca: [null, []],
      patente: [null, []],
      año: [null, []],
      tipoVehiculo: [null],
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

    //   if (parametros.marca) {
    //     filtros.marca = parametros.marca;
    //   }
      if (parametros.patente) {
        filtros.patente = parametros.patente;
      }
    //   if (parametros.año) {
    //     filtros.año = parametros.año;
    //   }
      if (parametros.tipoVehiculo) {
        filtros.idTipo = parametros.tipoVehiculo.id;
      }
      if (parametros.estadoEntidad) {
        filtros.idEstado = parametros.estadoEntidad.id;
      }

      this.retFiltros.emit(filtros);
    }
  }
  //  Autocomplete
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
  //  Autocomplete
  setAutocompleteTipoVehiculo() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteTipoVehiculo();
      }, 1000);
    } else {
      this.filteredTipoVehiculo =
        this.form.controls.tipoVehiculo.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.nombre)),
          map(name =>
            name ? this._filterTipoVehiculo(name) : this.tipoVehiculos.slice()
          )
        );
    }
  }
  private _filterTipoVehiculo(name: string): ITipoVehiculo[] {
    const filterValue = name.toLowerCase();

    return this.tipoVehiculos.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnTipoVehiculo(objeto: IEstadoEntidad): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
}
