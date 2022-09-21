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
import { IChofer } from 'app/models/iChofer';
import { map, Observable, startWith } from 'rxjs';
import { Location } from '@angular/common';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { IAreaInterna } from 'app/models/iAreaInterna';

@Component({
  selector: 'app-form-chofer',
  templateUrl: './form-chofer.component.html',
  styleUrls: ['./form-chofer.component.scss'],
})
export class FormChoferComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() areasInternas: IAreaInterna[];
  @Input() cargando: boolean;
  @Input() chofer?: IChofer;
  @Output() retForm = new EventEmitter<IChofer>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  filteredEstadoEntidad: Observable<IEstadoEntidad[]>;
  filteredAreas: Observable<IAreaInterna[]>;
  //
  form: FormGroup;
  esEditar = false;
  filteredLocaliIChoferes: Observable<IChofer[]>;
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
    if (changes.chofer && changes.chofer.currentValue) {
      this.esEditar = true;
      this.setForm();
    }
    if (changes.areasInternas && changes.areasInternas.currentValue) {
      this.setAutocompleteAreasInternas();
    }
    if (changes.estadosEntidad && changes.estadosEntidad.currentValue) {
      this.setAutocompleteEstadoEntidad();
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
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20),
        ],
      ],
      apellido: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30),
        ],
      ],
      contacto: [null, [ Validators.maxLength(256)]],
      comentario: [null, [ Validators.maxLength(1000)]],
      areaInterna: [null, []],
      estadoEntidad: [null, []],
      //   traza: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.chofer);
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
      const { areaInterna, estadoEntidad, ...chofer } = this.form.value;
      chofer.idAreaInterna = areaInterna?.id;
      chofer.idEstadoEntidad = estadoEntidad?.id;
      this.retForm.emit(chofer);
    }
  }
  //
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
      if (this.chofer) {
        const estado = this.estadosEntidad.find(
          x => x.id === this.chofer.idEstadoEntidad
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
  //
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
}
