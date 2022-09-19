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
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
import { IVehiculo } from 'app/models/iVehiculo';

const columnasMD = [
  'marca',
  'patente',
  'año',
  'tipoVehiculo',
  'estado',
  'opciones',
];
const columnasXS = ['nombre', 'estado', 'opciones'];
@Component({
  selector: 'app-tabla-vehiculos',
  templateUrl: './tabla-vehiculos.component.html',
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
export class TablaVehiculosComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() vehiculos: IVehiculo[];
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
  expandedElement: IVehiculo | null;
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
    if (changes.vehiculos && changes.vehiculos.currentValue) {
      this.dataSource.data = this.vehiculos;
      this.setEstadoEntidad();
    }
  }
  setEstadoEntidad() {
    let cantidad = 10;
    if (this.estadosEntidad && this.estadosEntidad.length > 0) {
      this.dataSource.data.forEach(x => {
        const encontrado = this.estadosEntidad.find(
          e => e.id === x.idEstadoEntidad
        );
        if (encontrado) {
          x.estadoEntidad = encontrado;
        } else {
          x.estadoEntidad = null;
        }
      });
    } else {
      if (cantidad > 0) {
        setTimeout(() => {
          this.setEstadoEntidad();
          cantidad--;
        }, 1000);
      }
    }
  }
  ngOnInit(): void {
    this.customSearchSortTable();
  }
  customSearchSortTable() {
    this.dataSource.filterPredicate = (data: IVehiculo, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      //   TODO: Verificar si hace falta agregar mas coluymnas
      const columns = [
        data.marca,
        data.tipoVehiculo?.nombre,
        data.patente,
        data.año,
        data.estadoEntidad.nombre,
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

    this.dataSource.sortingDataAccessor = (item: IVehiculo, property) => {
      //   property es el nombre de la columna, no del atributo de item.
      switch (property) {
        case 'tipoVehiculo':
          return item.tipoVehiculo ? item.tipoVehiculo.nombre.toString() : '';
        case 'estadoEntidad':
          return item.estadoEntidad ? item.estadoEntidad.nombre.toString() : '';

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
  editar(row: IVehiculo) {
    this.retEditar.emit(row.id);
  }
  eliminar(row: IVehiculo) {
    this.retEliminar.emit(row.id);
  }
}
