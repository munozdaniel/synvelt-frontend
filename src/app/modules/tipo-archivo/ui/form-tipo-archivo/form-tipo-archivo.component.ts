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
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { ITipoArchivo } from 'app/models/iTipoArchivoAdjunto';

@Component({
  selector: 'app-form-tipo-archivo',
  templateUrl: './form-tipo-archivo.component.html',
})
export class FormTipoArchivoComponent implements OnInit, OnChanges {
  lista = ['jpg', 'jpeg', 'png', 'pdf'];
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() cargando: boolean;
  @Input() tipoArchivo?: ITipoArchivo;
  @Output() retForm = new EventEmitter<ITipoArchivo>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
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
    if (changes.tipoArchivo && changes.tipoArchivo.currentValue) {
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
          map(value => (typeof value === 'string' ? value : value?.nombre)),
          map(name =>
            name ? this._filterEstadoEntidad(name) : this.estadosEntidad.slice()
          )
        );
      if (this.tipoArchivo) {
        const estado = this.estadosEntidad.find(
          x => x.id === this.tipoArchivo.idEstadoEntidad
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
      extensiones: [null, []],
      estadoEntidad: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.tipoArchivo);
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
      const { estadoEntidad, ...tipoArchivo } = this.form.value;
      tipoArchivo.idEstadoEntidad = estadoEntidad?.id;
      this.retForm.emit(tipoArchivo);
    }
  }
}
