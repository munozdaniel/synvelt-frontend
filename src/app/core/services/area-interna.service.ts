import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAreaInterna } from 'app/models/iAreaInterna';
@Injectable({
  providedIn: 'root',
})
export class AreaInternaService {
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
        let valor = '';
        if (typeof value === 'boolean') {
          valor = value ? 'true' : 'false';
        } else {
          valor = value ? (value as string) : '';
        }
        queryParams = queryParams.set(key, valor);
      });
      //   if (parametros.nombre) {
      //     queryParams = queryParams.append('nombre', parametros.nombre);
      //   }
      //   if (parametros.id) {
      //     queryParams = queryParams.append('id', parametros.id);
      //   }
      //   if (parametros.codigo) {
      //     queryParams = queryParams.append('codigo', parametros.codigo);
      //   }
    }
    return queryParams;
  }
  /**
   * GET usuarios/ListaAreaInterna?esAdministradorAplicacion={esAdministradorAplicacion}&esAdministradorDatos={esAdministradorDatos}&id={id}
   *
   * @param parametros
   * @returns
   */
  obtenertodos(parametros?: any): Observable<IAreaInterna[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaAreaInterna', {
      params: queryParams,
    });
  }
  /**
   * POST  usuarios/ActualizacionAreaInterna?
   * esAdministradorAplicacion={esAdministradorAplicacion}
   * &esAdministradorDatos={esAdministradorDatos}
   * &id={id}
   * &nombre={nombre}
   * &descripcion={descripcion}
   *
   */
  guardar(parametros: any): Observable<IAreaInterna> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.post<IAreaInterna>(
      this.url + 'operacion/ActualizacionAreaInterna',
      {},
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
  /**
   * POST operacion/AsignacionUsuarioInspector
   */
  asignar(idAreaInterna: string, usuariosIds: string[]): Observable<void> {
    let queryParams = new HttpParams();
    if (idAreaInterna) {
      queryParams = queryParams.append('idAreaInterna', idAreaInterna);
    }
    // usuariosIds.forEach(usuarioId => {
    //   queryParams = queryParams.append('usuariosIds', usuarioId);
    // });
    return this._http.post<any>(
      this.url + 'operacion/AsignacionUsuarioInspector',
      usuariosIds,
      {
        params: queryParams,
      }
    );
  }
  eliminar(id): Observable<void> {
    return this._http.delete<void>(
      this.url + `operacion/EliminacionAreaInterna?id=${id}`
    );
  }
}
