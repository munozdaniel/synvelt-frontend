import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { IRol } from 'app/models/iRol';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-filtro-roles',
  templateUrl: './filtro-roles.component.html',
})
export class FiltroRolesComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredRoles: Observable<IRol[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}
  /** CAMPOS FILTRO Y ORDEN
   *
   * CUIT - Nombre del Usuario - Área Municipal -
   * Perfil Asignado - Estado
   */
  ngOnInit(): void {
    this.form = this._fb.group({
      nombre: [null],
      descripcion: [null],
    });
  }
  limpiar() {
    this.form.reset();
    this.retFiltros.emit(null);
  }
  filtrar() {
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
      if (parametros.descripcion) {
        filtros.descripcion = parametros.descripcion;
      }

      this.retFiltros.emit(filtros);
    }
  }
}
