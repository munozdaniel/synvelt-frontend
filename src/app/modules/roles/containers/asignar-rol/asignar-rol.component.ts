import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
import { RolService } from 'app/core/services/rol.service';
import { UsuarioService } from 'app/core/services/usuario.service';
import { IRol } from 'app/models/iRol';
import { IUsuario } from 'app/models/iUsuario';
import { Location } from '@angular/common';
import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
const columnasMD = ['select', 'cuit', 'nombreCompleto', 'rol'];
const columnasXS = ['select', 'nombreCompleto'];
@UntilDestroy()
@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss'],
})
export class AsignarRolComponent implements OnInit {
  cargando = false;
  cargandoUsuario = false;
  usuarios: IUsuario[];
  usuariosSeleccionados: IUsuario[];
  rol: IRol;
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  columnas: string[];
  constructor(
    private _usuarioService: UsuarioService,
    private _synveltConfirmationService: SynveltConfirmationService,
    private _router: Router,
    private _rolService: RolService,
    private location: Location,
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
  volver() {
    this.location.back();
  }
  ngOnInit(): void {
    this.obtenerAreasInternas();
  }
  obtenerAreasInternas() {
    this.cargando = true;
    this._rolService
      .obtenertodos()
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

  obtenerUsuarios(roles: IRol[]) {
    this.cargandoUsuario = true;
    this._usuarioService
      .buscar()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.cargandoUsuario = false;
          this.usuarios = datos.map(x => {
            x.rol = roles.find(y => y.id === x.idRolPrincipal);
            return x;
          });
        },
        error => {
          this.cargandoUsuario = false;

          console.log('[ERROR]', error);
        }
      );
  }
  setFiltros(evento: IRol) {
    this.rol = evento;
  }
  setUsuariosSeleccionados(usuarios: IUsuario[]) {
    this.usuariosSeleccionados = usuarios;
  }
  asignarRol() {
    if (this.usuariosSeleccionados?.length < 1 && this.rol?.id) {
      // Mensaje de error
      this._synveltConfirmationService.open({
        title: 'Formulario incompleto',
        message: 'Tiene que seleccionar al menos un usuario y un rol',
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
      this._rolService
        .asignar(this.rol.id, usuariosIds)
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
