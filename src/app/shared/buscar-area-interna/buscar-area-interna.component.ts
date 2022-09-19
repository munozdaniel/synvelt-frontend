import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { synveltAnimations } from '@synvelt/animations';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { map, Observable, startWith } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-buscar-area-interna',
  templateUrl: './buscar-area-interna.component.html',
  animations: [synveltAnimations],
})
export class BuscarAreaInternaComponent implements OnInit {
  cargando: boolean;
  areasInternas: IAreaInterna[];
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredAreasInternas: Observable<IAreaInterna[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _areaInternaService: AreaInternaService
  ) {}

  ngOnInit(): void {
    // TODO: el requerido debe ser dinamico, traer por input
    this.form = this._fb.group({
      areaInterna: [null],
    });
    this.form.valueChanges.subscribe(val => {
      this.retFiltros.emit(val);
    });
    this.obtenerAreasInternas();
  }
  obtenerAreasInternas() {
    this._areaInternaService
      .obtenertodos()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.areasInternas = datos;
          this.setAutocompleteAreasInternas();
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  //  Autocomplete
  setAutocompleteAreasInternas() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteAreasInternas();
      }, 1000);
    } else {
      this.filteredAreasInternas =
        this.form.controls.areaInterna.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value?.nombre)),
          map(name =>
            name ? this._filterAreaInterna(name) : this.areasInternas.slice()
          )
        );
    }
  }
  private _filterAreaInterna(name: string): IAreaInterna[] {
    const filterValue = name.toLowerCase();

    return this.areasInternas.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnAreaInterna(objeto: IAreaInterna): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
}
