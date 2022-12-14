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
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-filtro-modelos',
  templateUrl: './filtro-modelos.component.html',
})
export class FiltroModeloComponent implements OnInit, OnChanges {
  @Input() cargando = false;
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredModeloItem: Observable<IModeloItemListaControl[]>;
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
      agrupacion: [null],
      vigente: [null],
    });
  }
  limpiar() {
    this.form.reset();
    this.retFiltros.emit(null);
  }
  filtrar() {
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
      if (parametros.agrupacion) {
        filtros.agrupacion = parametros.agrupacion;
      }
      filtros.vigente = parametros.vigente;

      this.retFiltros.emit(filtros);
    }
  }
}
