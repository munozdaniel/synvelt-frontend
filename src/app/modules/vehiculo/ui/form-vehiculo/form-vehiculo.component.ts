import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IVehiculo } from 'app/models/iVehiculo';
import { Location } from '@angular/common';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoVehiculo } from 'app/models/ITipoVehiculo';
import { startWith, map, Observable } from 'rxjs';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
})
export class FormVehiculoComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() tipoVehiculos: ITipoVehiculo[];
  @Input() cargando: boolean;
  @Input() vehiculo?: IVehiculo;
  @Output() retForm = new EventEmitter<any>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  //
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  filteredTipoVehiculo: Observable<IEstadoEntidad[]>;

  //
  form: FormGroup;
  esEditar = false;
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    public breakpointObserver: BreakpointObserver,
    private location: Location
  ) {
    // "Escuchador" del tamaño de pantalla
    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          // Si la pantalla es small
          this.isMobile = true;
        } else {
          // Si la pantalla no es small
          this.isMobile = false;
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.estadosEntidad && changes.estadosEntidad.currentValue) {
      this.setAutocompleteEstadoEntidad();
    }
    if (changes.tipoVehiculos && changes.tipoVehiculos.currentValue) {
      this.setAutocompleteTipoVehiculo();
    }
    if (changes.vehiculo && changes.vehiculo.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  volver() {
    this.location.back();
  }
  initForm(): void {
    this.form = this._fb.group({
      id: [null, []],
      marca: [null, [Validators.minLength(1), Validators.maxLength(30)]],
      patente: [null, [Validators.minLength(1), Validators.maxLength(10)]],
      año: [null, [Validators.min(0)]],
      estadoEntidad: [null, []],
      tipoVehiculo: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.vehiculo);
    }
  }

  //   Fin:Autocomplete

  guardar(): void {
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
      const vehiculo = this.form.value;
      const retorno = {};
      if (vehiculo.id) {
        retorno['id'] = vehiculo.id;
      }
      if (vehiculo.marca) {
        retorno['marca'] = vehiculo.marca;
      }
      if (vehiculo.patente) {
        retorno['patente'] = vehiculo.patente;
      }
      if (vehiculo.año) {
        retorno['año'] = vehiculo.año;
      }
      if (vehiculo.estadoEntidad) {
        retorno['idEstadoEntidad'] = vehiculo.estadoEntidad.id;
      }
      if (vehiculo.tipoVehiculo) {
        retorno['idTipoVehiculo'] = vehiculo.tipoVehiculo.id;
      }
      this.retForm.emit(retorno);
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
          map(value => (typeof value === 'string' ? value : value.nombre)),
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
