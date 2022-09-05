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
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
import { Observable, startWith, map } from 'rxjs';
import { IModeloTipoDato } from 'app/models/iModeloTipoDato';
import { Location } from '@angular/common';
import { ValidationService } from 'app/shared/controlmessage/validation.services';

@Component({
  selector: 'app-form-modelo',
  templateUrl: './form-modelo.component.html',
  styleUrls: ['./form-modelo.component.scss'],
})
export class FormModeloComponent implements OnInit, OnChanges {
  @Input() esEditar = false;
  @Input() cargando: boolean;
  @Input() modelosTipoDato: IModeloTipoDato[];
  // @Input() areaInterna?: IAreaInterna;
  @Output() retForm = new EventEmitter<IModeloItemListaControl>();
  //
  formModeloLista: FormGroup;
  formModeloItemLista: FormGroup;
  filteredTipoDato: Observable<IModeloTipoDato[]>;
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  ordenDefault = 0;
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
    // if (
    //   changes.modelosItemListaControl &&
    //   changes.modelosItemListaControl.currentValue
    // ) {
    //   this.setForm();
    // }
    if (changes.modelosTipoDato && changes.modelosTipoDato.currentValue) {
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  volver() {
    this.location.back();
  }
  //  Autocomplete
  setAutocompleteModeloTipoDato(formularioDinamico) {
    if (!this.modelosTipoDato) {
      setTimeout(() => {
        this.setAutocompleteModeloTipoDato(formularioDinamico);
      }, 1000);
    } else {
      console.log(
        'formularioDinamico.modeloTipoDato',
        formularioDinamico.controls.modeloTipoDato
      );
      this.filteredTipoDato =
        formularioDinamico.controls.modeloTipoDato.valueChanges.pipe(
          startWith(''),
          map((value: any) =>
            typeof value === 'string' ? value : value.nombre
          ),
          map((name: any) =>
            name
              ? this._filterModeloTipoDato(name)
              : this.modelosTipoDato.slice()
          )
        );
      // }
    }
  }
  private _filterModeloTipoDato(name: string): IModeloTipoDato[] {
    const filterValue = name.toLowerCase();

    return this.modelosTipoDato.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnTipoDato(objeto: IModeloTipoDato): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
  //   Fin: Autocomplete
  getModeloItemLista(): FormArray {
    return this.formModeloLista.get('modeloItemLista') as FormArray;
  }
  newModeloItemLista(): FormGroup {
    this.ordenDefault += 10;
    const formularioDinamico = this._fb.group({
      //   idBody: [null, []], Lo maneja el backend
      //   modeloListaControl: [null, []],
      modeloTipoDato: [null, [ValidationService.esObjeto]], // Autocomplete
      orden: [this.ordenDefault, [Validators.min(0)]],
      nombre: [null, [Validators.required]],
      multipleSeleccion: [false, []],
      multiplesValores: [false, []],
      formato: [null, []],
      longitudMaxima: [null, [Validators.min(0)]],
      metodoSeleccion: [null, []],
      columnaDescripcion: [null, []],
      columnaSeleccion: [null, []],
      columnaValor: [null, []],
      opcional: [true, []],
      vigenteBody: [true, []],
      visibleUsuarioGeneral: [true, []],
    });
    this.setAutocompleteModeloTipoDato(formularioDinamico);

    return formularioDinamico;
  }
  addModeloItemLista() {
    this.getModeloItemLista().push(this.newModeloItemLista());
  }
  removeModeloItemLista(empIndex: number) {
    this.getModeloItemLista().removeAt(empIndex);
  }

  initForm(): void {
    this.formModeloLista = this._fb.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      comentario: [null, []],
      vigente: [true, []],
      modeloItemLista: this._fb.array([]),
    });
    this.addModeloItemLista();
    // Collection of ModeloItemListaControl
    // this.formModeloItemLista = this._fb.group({
    //   //   idBody: [null, []], Lo maneja el backend
    //   //   modeloListaControl: [null, []],
    //   modeloTipoDato: [null, []],
    //   orden: [null, [Validators.min(0)]],
    //   nombreBody: [null, []],
    //   multipleSeleccion: [false, []],
    //   multiplesValores: [false, []],
    //   formato: [null, []],
    //   longitudMaxima: [null, [Validators.min(0)]],
    //   metodoSeleccion: [null, []],
    //   columnaDescripcion: [null, []],
    //   columnaSeleccion: [null, []],
    //   columnaValor: [null, []],
    //   opcional: [false, []],
    //   vigenteBody: [true, []],
    //   visibleUsuarioGeneral: [false, []],
    // });
  }

  setForm() {
    if (!this.formModeloLista) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      //   this.formModeloLista.patchValue(this.modelosItemListaControl);
    }
  }

  //   Fin:Autocomplete

  guardar(): void {
    if (this.formModeloLista.invalid) {
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
      const areaInterna = this.formModeloLista.value;
      this.retForm.emit(this.formModeloLista.value);
    }
  }
}
