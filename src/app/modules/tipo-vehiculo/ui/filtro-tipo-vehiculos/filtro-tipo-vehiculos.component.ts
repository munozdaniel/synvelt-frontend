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
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-filtro-tipo-vehiculos',
  templateUrl: './filtro-tipo-vehiculos.component.html',
})
export class FiltroTiposVehiculoComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Input() estadosEntidad: IEstadoEntidad[];
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estadosEntidad && changes.estadosEntidad.currentValue) {
      this.setAutocompleteEstadoEntidad();
    }}
  /** CAMPOS FILTRO Y ORDEN
   *
   * CUIT - Nombre del Usuario - Área Municipal -
   * Perfil Asignado - Estado
   */
  ngOnInit(): void {
    this.form = this._fb.group({
      nombre: [null],
      estadoEntidad: [[]],
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
      if (parametros.codigoPostal) {
        filtros.codigoPostal = parametros.codigoPostal;
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
              map(value => (typeof value === 'string' ? value : value.nombre)),
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
