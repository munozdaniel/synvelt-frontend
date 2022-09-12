import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { AreaInternaService } from 'app/core/services/area-interna.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IAreaInterna } from 'app/models/iAreaInterna';
import { IUsuario } from 'app/models/iUsuario';
const columnasMD = ['select', 'cuit', 'nombreCompleto', 'area'];
const columnasXS = ['select', 'nombreCompleto'];
@UntilDestroy()
@Component({
  selector: 'app-asignar-area-interna',
  templateUrl: './asignar-area-interna.component.html',
  styleUrls: ['./asignar-area-interna.component.scss'],
})
export class AsignarAreaInternaComponent implements OnInit {
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  usuariosSeleccionados: IUsuario[];
  areaInterna: IAreaInterna;
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  columnas: string[];
  constructor(
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router,
    private _areaInternaService: AreaInternaService,
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

  ngOnInit(): void {
    this.obtenerAreasInternas();
  }
  obtenerAreasInternas() {
    this.cargando = true;
    this._areaInternaService
      .obtenertodos()
      .pipe(untilDestroyed(this))
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.obtenerUsuarios(datos);
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }

  obtenerUsuarios(areasInternas: IAreaInterna[]) {
    this.cargandoUsuario = true;
    this._usuarioService
      .buscar()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargandoUsuario = false;
          this.usuarios = datos.map(x => {
            x.areaInterna = areasInternas.find(y => y.id === x.idAreaInterna);
            return x;
          });
        },
        error => {
          this.cargandoUsuario = false;

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(evento: IAreaInterna) {
    this.areaInterna = evento;
  }
  setUsuariosSeleccionados(usuarios: IUsuario[]) {
    this.usuariosSeleccionados = usuarios;
  }
  asignarAreaInterna() {
    if (this.usuariosSeleccionados?.length < 1 && this.areaInterna?.id) {
      // Mensaje de error
      this._synveltConfirmationService.open({
        title: 'Formulario incompleto',
        message: 'Tiene que seleccionar al menos un usuario y un area interna',
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
      this.cargando = true;
      const usuariosIds = this.usuariosSeleccionados.map(usuario => usuario.id);
      this._areaInternaService
        .asignar(this.areaInterna.id, usuariosIds)
        .pipe(untilDestroyed(this))
        .subscribe(
          datos => {
            this.cargando = true;
            this._synveltConfirmationService.success();
          },
          error => {
            this.cargando = true;
            console.log('[ERROR]', error);
          }
        );
    }
  }
}
