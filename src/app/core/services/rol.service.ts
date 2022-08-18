import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRol } from 'app/models/iRol';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  protected headers = new HttpHeaders().append(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      Object.entries(parametros).forEach(([key, value], index) => {
        // queryParams = queryParams.set(key, value ? (value as string) : '');
        let valor = '';
        if (typeof value === 'boolean') {
          valor = value ? 'true' : 'false';
        } else {
          valor = value ? (value as string) : '';
        }
        queryParams = queryParams.set(key, valor);
      });
      // if (parametros.esAdministradorAplicacion) {
      //   queryParams = queryParams.append(
      //     'esAdministradorAplicacion',
      //     parametros.esAdministradorAplicacion
      //   );
      // }
      // if (parametros.esAdministradorDatos) {
      //   queryParams = queryParams.append(
      //     'esAdministradorDatos',
      //     parametros.esAdministradorDatos
      //   );
      // }

      // if (parametros.id) {
      //   queryParams = queryParams.append('id', parametros.id);
      // }
      // if (parametros.nombre) {
      //   queryParams = queryParams.append('nombre', parametros.nombre);
      // }
      // if (parametros.descripcion) {
      //   queryParams = queryParams.append('descripcion', parametros.descripcion);
      // }
    }
    return queryParams;
  }
  /**
   * GET usuarios/ListaRol?esAdministradorAplicacion={esAdministradorAplicacion}&esAdministradorDatos={esAdministradorDatos}&id={id}
   *
   * @param parametros
   * @returns
   */
  obtenertodos(parametros?: any): Observable<IRol[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'usuarios/ListaRol', {
      params: queryParams,
    });
  }
  //   usuarios/ActualizacionRol?esAdministradorAplicacion={esAdministradorAplicacion}&esAdministradorDatos={esAdministradorDatos}&id={id}&nombre={nombre}&descripcion={descripcion}
  guardar(parametros: any): Observable<IRol> {
    const queryParams = this.setQueryParams(parametros);
    console.log('queryParams', queryParams);
    return this._http.post<IRol>(
      this.url + 'usuarios/ActualizacionRol',
      {},
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
  asignar(idRol: string, usuariosIds: string[]): Observable<void> {
    const queryParams = this.setQueryParams({ idRol });
    // let queryParams = new HttpParams();
    // if (idRol) {
    //   queryParams = queryParams.append('idRol', idRol);
    // }
    // usuariosIds.forEach(usuarioId => {
    //   queryParams = queryParams.append('usuariosIds', usuarioId);
    // });
    return this._http.post<any>(
      this.url + 'usuarios/AsignacionUsuariosRol',
      usuariosIds,
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }

  eliminar(id): Observable<void> {
    return this._http.put<void>(this.url + `roles/Baja?id=${id}`, null);
  }
}
