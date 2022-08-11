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
import { IAreaInterna } from 'app/models/iAreaInterna';
import { Observable, startWith, map } from 'rxjs';
@Component({
  selector: 'app-filtro-areas-internas',
  templateUrl: './filtro-areas-internas.component.html',
})
export class FiltroAreasInternasComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredAreasInternas: Observable<IAreaInterna[]>;
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
      codigo: [null],
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
      if (parametros.codigo) {
        filtros.codigo = parametros.codigo;
      }

      this.retFiltros.emit(filtros);
    }
  }
}
