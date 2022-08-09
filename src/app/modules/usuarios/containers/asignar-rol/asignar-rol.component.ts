import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RolService } from 'app/core/services/rol.service';
import { IRol } from 'app/models/iRol';
@UntilDestroy()
@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss'],
})
export class AsignarRolComponent implements OnInit {
  roles: IRol[];
  usuarioId: string;
  rolId: string;
  constructor(
    private _activeRoute: ActivatedRoute,
    private _rolService: RolService
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
    this._activeRoute.params.subscribe(params => {
      this.usuarioId = params['id'];
      //   if (this.usuarioId) {
      //     this.obtenerUsuarioPorId();
      //   } else {
      //     // TODO: Controlar que fucnione y mostrar mensaje: 'El usuario solicitado no se encuentra disponible'
      //     this._router.navigate(['usuarios']);
      //   }
    });
  }
  obtenerRoles() {
    this._rolService
      .obtenertodos()
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          this.roles = datos;
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
  }
}
