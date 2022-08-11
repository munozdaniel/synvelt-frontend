import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { synveltAnimations } from '@synvelt/animations';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { IRol } from 'app/models/iRol';
import { map, Observable, startWith } from 'rxjs';
@UntilDestroy()
@Component({
  selector: 'app-buscar-rol',
  templateUrl: './buscar-rol.component.html',
  animations: [synveltAnimations],
})
export class BusquedaRolComponent implements OnInit {
  cargando: boolean;
  roles: IRol[];
  @Output() retFiltros = new EventEmitter<any>();
  form: FormGroup;
  filteredRoles: Observable<IRol[]>;
  constructor(
    private _fb: FormBuilder,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _rolService: RolService
  ) {}

  ngOnInit(): void {
    // TODO: el requerido debe ser dinamico, traer por input
    this.form = this._fb.group({
      rol: [null],
    });
    this.form.valueChanges.subscribe(val => {
      this.retFiltros.emit(val);
    });
    this.obtenerRoles();
  }
  obtenerRoles() {
    this._rolService
      .obtenertodos()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.roles = datos;
          this.setAutocompleteRoles();
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
  //  Autocomplete
  setAutocompleteRoles() {
    if (!this.form) {
      setTimeout(() => {
        this.setAutocompleteRoles();
      }, 1000);
    } else {
      this.filteredRoles = this.form.controls.rol.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nombre)),
        map(name => (name ? this._filterRol(name) : this.roles.slice()))
      );
    }
  }
  private _filterRol(name: string): IRol[] {
    const filterValue = name.toLowerCase();

    return this.roles.filter(option => {
      const nombreCompleto = option.nombre;
      // return nombreCompleto.toLowerCase().indexOf(filterValue) === 0;
      return nombreCompleto.toLowerCase().includes(filterValue);
    });
  }
  displayFnRol(objeto: IRol): string {
    return objeto && objeto.nombre ? objeto.nombre : '';
  }
}
