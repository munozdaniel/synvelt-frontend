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
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IChofer } from 'app/models/iChofer';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';

const columnasMD = [
  'nombre',
  'apellido',
  'contacto',
  'areaInterna',
  'estado',
  'opciones',
];
const columnasXS = ['nombre', 'opciones'];
@Component({
  selector: 'app-tabla-choferes',
  templateUrl: './tabla-choferes.component.html',
  styleUrls: ['./tabla-choferes.component.scss'],
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
export class TablaChoferesComponent implements OnInit, OnChanges {
  @Input() estadosEntidad: IEstadoEntidad[];
  @Input() areasInternas: IAreaInterna[];
  @Input() choferes: IChofer[];
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
  expandedElement: IChofer | null;
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
    if (changes.choferes && changes.choferes.currentValue) {
      this.dataSource.data = this.choferes;
      this.setEstadoEntidad();
      this.setAreaInterna();
    }
  }
  setEstadoEntidad() {
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
      setTimeout(() => {
        this.setEstadoEntidad();
      }, 1000);
    }
  }
  setAreaInterna() {
    if (this.areasInternas && this.areasInternas.length > 0) {
      this.dataSource.data.forEach(x => {
        const encontrado = this.areasInternas.find(
          e => e.id === x.idAreaInterna
        );
        if (encontrado) {
          x.areaInterna = encontrado;
        } else {
          x.areaInterna = null;
        }
      });
    } else {
      setTimeout(() => {
        this.setAreaInterna();
      }, 1000);
    }
  }
  ngOnInit(): void {
    this.customSearchSortTable();
  }
  customSearchSortTable() {
    this.dataSource.filterPredicate = (data: IChofer, filters: string) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      //   TODO: Verificar si hace falta agregar mas coluymnas
      const columns = [
        data.nombre,
        data.apellido,
        data.contacto,
        data.areaInterna?.nombre,
        data.estadoEntidad?.nombre,
        data.comentario,
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

    this.dataSource.sortingDataAccessor = (item: IChofer, property) => {
      //   property es el nombre de la columna, no del atributo de item.
      switch (property) {
        case 'areaInterna':
          return item.areaInterna ? item.areaInterna.nombre.toString() : '';
        case 'estado':
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
  editar(row: IChofer) {
    this.retEditar.emit(row.id);
  }
  eliminar(row: IChofer) {
    this.retEliminar.emit(row.id);
  }
}
