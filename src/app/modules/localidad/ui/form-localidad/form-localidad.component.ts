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
import { ILocalidad } from 'app/models/iLocalidad';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-localidad',
  templateUrl: './form-localidad.component.html',
  styleUrls: ['./form-localidad.component.scss'],
})
export class FormLocalidadComponent implements OnInit, OnChanges {
  @Input() cargando: boolean;
  @Input() localidad?: ILocalidad;
  @Output() retForm = new EventEmitter<ILocalidad>();
  @Output() retUsernameExiste = new EventEmitter<any>();
  //
  form: FormGroup;
  esEditar = false;
  filteredLocaliILocalidades: Observable<ILocalidad[]>;
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
    if (changes.localidad && changes.localidad.currentValue) {
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
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      codigoPostal: [null, [Validators.minLength(1), Validators.maxLength(5)]],
      //   traza: [null, []],
    });
  }

  setForm() {
    if (!this.form) {
      setTimeout(() => {
        this.setForm();
      }, 1000);
    } else {
      this.form.patchValue(this.localidad);
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
      const localidad = this.form.value;
      this.retForm.emit(localidad);
    }
  }
}
