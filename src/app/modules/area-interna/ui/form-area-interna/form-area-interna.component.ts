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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { synveltAnimations } from '@synvelt/animations';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { Observable } from 'rxjs';
import { IAreaInterna } from 'app/models/iAreaInterna';
import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-area-interna',
  templateUrl: './form-area-interna.component.html',
  animations: [synveltAnimations],
})
export class FormAreaInternaComponent implements OnInit, OnChanges {
  @Input() cargando: boolean;
  @Input() areaInterna?: IAreaInterna;
  @Output() retForm = new EventEmitter<IAreaInterna>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  //
  form: FormGroup;
  esEditar = false;
  filteredAreaInternaes: Observable<IAreaInterna[]>;
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
    if (changes.areaInterna && changes.areaInterna.currentValue) {
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
      nombre: [null, [Validators.required]],
      codigo: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      console.log('¿this.areaInterna', this.areaInterna);
      this.form.patchValue(this.areaInterna);
    }
  }

  //   Fin:Autocomplete

  guardar(): void {
    if (this.form.invalid) {
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
      const areaInterna = this.form.value;
      this.retForm.emit(this.form.value);
    }
  }
}
