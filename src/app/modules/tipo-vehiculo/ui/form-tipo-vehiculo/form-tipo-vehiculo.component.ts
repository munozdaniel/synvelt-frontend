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
import { map, Observable, startWith } from 'rxjs';
import { Location } from '@angular/common';
import { ITipoVehiculo } from 'app/models/ITipoVehiculo';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';

@Component({
  selector: 'app-form-tipo-vehiculo',
  templateUrl: './form-tipo-vehiculo.component.html',
})
export class FormTipoVehiculoComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() cargando: boolean;
  @Input() tipoVehiculo?: ITipoVehiculo;
  @Output() retForm = new EventEmitter<any>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  //
  form: FormGroup;
  esEditar = false;
  filteredLocaliITipoVehiculoes: Observable<ITipoVehiculo[]>;
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
    if (changes.tipoVehiculo && changes.tipoVehiculo.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
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
      if (this.tipoVehiculo) {
        const estado = this.estadosEntidad.find(
          x => x.id === this.tipoVehiculo.idEstadoEntidad
        );
        this.form.controls.estadoEntidad.setValue(estado);
      }
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
  volver() {
    this.location.back();
  }
  initForm(): void {
    this.form = this._fb.group({
      id: [null, []],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      estadoEntidad: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.tipoVehiculo);
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
      const tipoVehiculo = this.form.value;
      const retorno: any = {};
      if (tipoVehiculo.nombre) {
        retorno['nombre'] = tipoVehiculo.nombre;
      }
      if (tipoVehiculo.estadoEntidad) {
        retorno['idEstadoEntidad'] = tipoVehiculo.estadoEntidad.id;
      }
      this.retForm.emit(retorno);
    }
  }
}
