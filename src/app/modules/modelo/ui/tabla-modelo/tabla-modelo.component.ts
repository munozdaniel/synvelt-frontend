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
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { synveltAnimations } from '@synvelt/animations';
import { IModeloItemListaControl } from 'app/models/iModeloItemListaControl';
import { IModeloListaControl } from 'app/models/iModeloListaControl';
import { DialogDetalleItemsComponent } from '../dialog-detalle-items/dialog-detalle-items.component';
const columnasMD = ['nombre', 'comentario', 'opciones'];
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
  @Output() retObtenerModeloItem = new EventEmitter<IModeloListaControl>();
  columnas = columnasMD;
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild('sort') set setSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild('paginator') set setPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  expandedElement: IModeloListaControl | null;
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    public breakpointObserver: BreakpointObserver,
    private _dialog: MatDialog
  ) {
    // "Escuchador" del tama??o de pantalla
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
    if (changes.modelosItem && changes.modelosItem.currentValue) {
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
  getModeloItem(row: IModeloListaControl) {
    const index = this.modelosItem.findIndex(
      x => x.idModeloListaControl === row.id
    );
    if (index !== -1) {
      return this.modelosItem[index];
    }
  }
  obtenerModeloItem(row: IModeloListaControl) {
    this.expandedElement = this.expandedElement !== row ? row : null;
    if (!row.items) {
      this.retObtenerModeloItem.emit(row);
    }
  }
  mostrarDetalles(row: IModeloItemListaControl) {
    const dialogRef = this._dialog.open(DialogDetalleItemsComponent, {
      width: '55%',
      data: { modelo: row },
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
