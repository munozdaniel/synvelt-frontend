import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
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
import { synveltAnimations } from '@synvelt/animations';
import { ILocalidad } from 'app/models/iLocalidad';

const columnasMD = ['nombre', 'codigoPostal', 'opciones'];
const columnasXS = ['nombre', 'opciones'];
@Component({
  selector: 'app-tabla-localidades',
  templateUrl: './tabla-localidades.component.html',
  styleUrls: ['./tabla-localidades.component.scss'],
  animations: [
    synveltAnimations,
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TablaLocalidadesComponent implements OnInit, OnChanges {
  @Input() localidades: ILocalidad[];
  @Input() cargando: boolean;
  @Output() retEliminar = new EventEmitter<string>();
  @Output() retEditar = new EventEmitter<string>();
  columnas = columnasMD;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('sort') set setSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild('paginator') set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  expandedElement: ILocalidad | null;
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
    if (changes.localidades && changes.localidades.currentValue) {
      this.dataSource.data = this.localidades;
    }
  }

  ngOnInit(): void {
    this.customSearchSortTable();
  }
  customSearchSortTable() {
    this.dataSource.filterPredicate = (data: ILocalidad, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      //   TODO: Verificar si hace falta agregar mas coluymnas
      const columns = [data.nombre, data.codigoPostal];

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

    this.dataSource.sortingDataAccessor = (item: ILocalidad, property) => {
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
  editar(row: ILocalidad) {
    this.retEditar.emit(row.id);
  }
  eliminar(row: ILocalidad) {
    this.retEliminar.emit(row.id);
  }
}
