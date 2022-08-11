import { SelectionModel } from '@angular/cdk/collections';
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
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'app/models/iUsuario';
const columnasMD = ['select', 'cuit', 'nombreCompleto', 'area'];
const columnasXS = ['select', 'nombreCompleto'];
@Component({
  selector: 'app-seleccionar-usuarios-tabla',
  templateUrl: './seleccionar-usuarios-tabla.component.html',
  styleUrls: ['./seleccionar-usuarios-tabla.component.scss'],
})
export class SeleccionarUsuariosTablaComponent implements OnInit, OnChanges {
  //
  @Input() cargando: boolean;
  @Input() usuarios: IUsuario[];
  @Output() retUsuariosSeleccionados = new EventEmitter<IUsuario[]>();
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('sort') set setSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild('paginator') set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  columnas = columnasMD;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<IUsuario>(
    this.allowMultiSelect,
    this.initialSelection
  );
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    public breakpointObserver: BreakpointObserver
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
          this.columnas = columnasXS;
        } else {
          // Si la pantalla no es small
          this.isMobile = false;
          this.columnas = columnasMD;
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuarios && changes.usuarios.currentValue) {
      this.dataSource.data = this.usuarios.map(x => ({ ...x, select: false }));
    }
  }
  ngOnInit(): void {
    this.customSearchSortTable();
  }
  customSearchSortTable() {
    this.dataSource.filterPredicate = (data: IUsuario, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      //   TODO: Verificar si hace falta agregar mas coluymnas
      const columns = [
        data.nombre,
        data.apellido,
        data.cuil,
        data.direccionMail,
      ];

      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => {
          if (column) {
            customFilter.push(column.toString().toLowerCase().includes(filter));
          }
        });
        matchFilter.push(customFilter.some(Boolean)); // OR
      });
      return matchFilter.every(Boolean); // AND
    };
    this.dataSource.sortingDataAccessor = (item: IUsuario, property) => {
      //   property es el nombre de la columna, no del atributo de item.
      switch (property) {
        // case 'empresa':
        //   return item.empresa ? item.empresa.razon_social.toString() : '';

        default:
          return item[property];
      }
    };
  }
  setFiltroRapido(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //   Acciones de la tabla

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
    this.enviarRow();
  }
  enviarRow() {
    this.retUsuariosSeleccionados.emit(this.selection.selected);
  }
}
