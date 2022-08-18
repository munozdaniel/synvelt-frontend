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
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';
const columnasMD = [
  'cuit',
  'nombreCompleto',
  'area',
  'rol',
  'estado',
  'opciones',
];
const columnasXS = ['nombreCompleto', 'opciones'];
@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
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
export class TablaUsuariosComponent implements OnInit, OnChanges {
  @Input() usuarios: IUsuario[];
  @Input() areasInternas: IAreaInterna[];
  @Input() roles: IRol[];
  @Input() cargando: boolean;
  @Output() retAsignarRol = new EventEmitter<string>();
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
  expandedElement: IUsuario | null;
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
    if (changes.roles && changes.roles.currentValue) {
      this.setUsuariosConRol();
    }
    if (changes.areasInternas && changes.areasInternas.currentValue) {
      this.setUsuariosConAreaInterna();
    }
    if (changes.usuarios && changes.usuarios.currentValue) {
      this.dataSource.data = this.usuarios;
    }
  }
  setUsuariosConRol() {
    if (!this.usuarios) {
      setTimeout(() => {
        this.setUsuariosConRol();
      }, 1000);
    } else {
      this.usuarios.forEach(usuario => {
        const index = this.roles.findIndex(
          rol => rol.id === usuario.idRolPrincipal
        );
        if (index !== -1) {
          usuario.rol = this.roles[index];
        }
      });
    }
  }
  setUsuariosConAreaInterna() {
    if (!this.usuarios) {
      setTimeout(() => {
        this.setUsuariosConAreaInterna();
      }, 1000);
    } else {
      this.usuarios.forEach(usuario => {
        const index = this.areasInternas.findIndex(
          x => x.id === usuario.idAreaInterna
        );
        if (index !== -1) {
          usuario.areaInterna = this.areasInternas[index];
        }
      });
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
  editar(row: IUsuario) {
    this.retEditar.emit(row.id);
  }
  eliminar(row: IUsuario) {
    this.retEliminar.emit(row.id);
  }
  asignarRol(row: IUsuario) {
    this.retEliminar.emit(row.id);
  }
}
