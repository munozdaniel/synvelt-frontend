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
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
const columnasMD = ['nombre', 'codigo', 'opciones'];
const columnasXS = ['nombre', 'opciones'];
@Component({
  selector: 'app-tabla-modelo',
  templateUrl: './tabla-modelo.component.html',
  styleUrls: ['./tabla-modelo.component.scss'],
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
export class TablaModeloComponent implements OnInit, OnChanges {
  @Input() modelosItem: IModeloItemListaControl[];
  @Input() cargando: boolean;
  @Output() retEliminar = new EventEmitter<number>();
  @Output() retEditar = new EventEmitter<number>();
  columnas = columnasMD;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('sort') set setSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild('paginator') set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  expandedElement: IModeloItemListaControl | null;
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
    if (changes.odeloItem && changes.odeloItem.currentValue) {
      this.dataSource.data = this.modelosItem;
    }
  }

  ngOnInit(): void {
    this.customSearchSortTable();
  }
  customSearchSortTable() {
    this.dataSource.filterPredicate = (
      data: IModeloItemListaControl,
      filters: string
    ) => {
      const matchFilter = [];
      const filterArray = filters.split(',');
      //   TODO: Verificar si hace falta agregar mas coluymnas
      const columns = [data.nombre];

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

    this.dataSource.sortingDataAccessor = (
      item: IModeloItemListaControl,
      property
    ) => {
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
  editar(row: IModeloItemListaControl) {
    this.retEditar.emit(row.id);
  }
  eliminar(row: IModeloItemListaControl) {
    this.retEliminar.emit(row.id);
  }
}
