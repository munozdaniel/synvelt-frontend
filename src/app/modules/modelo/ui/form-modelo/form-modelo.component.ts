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
import { IModeloListaControl } from 'app/models/iModeloListaControl';

@Component({
  selector: 'app-form-modelo',
  templateUrl: './form-modelo.component.html',
  styleUrls: ['./form-modelo.component.scss'],
})
export class FormModeloComponent implements OnInit, OnChanges {
  @Input() esEditar = false;
  @Input() cargando: boolean;
  @Input() modelosTipoDato: IModeloTipoDato[];
  @Input() modelo?: IModeloListaControl;
  @Input() modeloItems?: IModeloItemListaControl[];
  @Output() retForm = new EventEmitter<any>();
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
    if (changes.modeloItems && changes.modeloItems.currentValue) {
      this.setFormItems();
    }
    if (changes.modelo && changes.modelo.currentValue) {
      console.log('modelo', this.modelo);
      this.setForm();
      // this.setForm();
    }
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
      id: [null],
      //   idBody: [null, []], Lo maneja el backend
      //   modeloListaControl: [null, []],
      modeloTipoDato: [null, [ValidationService.esObjeto, Validators.required]], // Autocomplete
      orden: [this.ordenDefault, [Validators.min(0), Validators.required]],
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
      editable: [true, []],
      agrupacion: [null, []],
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
    if (!this.esEditar) {
      this.addModeloItemLista();
    }
  }

  setForm() {
    if (!this.formModeloLista) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.formModeloLista.patchValue(this.modelo);
    }
  }
  setFormItems() {
    if (!this.formModeloLista) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      console.log('setFormItems', this.modeloItems);
      const datos = this.modeloItems.map(x => {
        const modeloItem: FormGroup = this.newModeloItemLista();
        this.getModeloItemLista().push(modeloItem);
        const modeloTipoDato = this.modelosTipoDato.find(
          m => m.id === x.idModeloTipoDato
        );
        return { ...x, modeloTipoDato };
      });
      console.log('¿modeloTipoDato', datos);
      this.formModeloLista.controls.modeloItemLista.patchValue(datos);
    }
  }

  //   Fin:Autocomplete

  guardar(): void {
    if (this.formModeloLista.invalid) {
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
      const { id, nombre, comentario, vigente, modeloItemLista } =
        this.formModeloLista.value;
      const modeloLista: IModeloListaControl = {
        id,
        nombre,
        comentario,
        vigente,
      };
      const modelosItemListaFormat: IModeloItemListaControl[] =
        modeloItemLista.map((x: any) => {
          const retorno: IModeloItemListaControl = {
            id: x.id,
            idModeloTipoDato: x.modeloTipoDato.id,
            orden: x.orden,
            nombre: x.nombre,
            multipleSeleccion: x.multipleSeleccion,
            multiplesValores: x.multiplesValores,
            formato: x.formato,
            longitudMaxima: x.longitudMaxima,
            metodoSeleccion: x.metodoSeleccion,
            columnaDescripcion: x.columnaDescripcion,
            columnaSeleccion: x.columnaSeleccion,
            columnaValor: x.columnaValor,
            opcional: x.opcional,
            vigente: x.vigenteBody,
            visibleUsuarioGeneral: x.visibleUsuarioGeneral,
            editable: x.editable,
            agrupacion: x.agrupacion,
          };
          return retorno;
        });
      this.retForm.emit({
        modeloLista,
        modeloItemLista: modelosItemListaFormat,
      });
    }
  }
}
