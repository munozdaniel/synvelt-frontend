import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAreaInterna } from 'app/models/iAreaInterna';
@Injectable({
  providedIn: 'root',
})
export class AreaInternaService {
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      if (parametros.nombre) {
        queryParams = queryParams.append('nombre', parametros.nombre);
      }
      if (parametros.id) {
        queryParams = queryParams.append('id', parametros.id);
      }
      if (parametros.codigo) {
        queryParams = queryParams.append('codigo', parametros.codigo);
      }
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
    return this._http.get<any>(this.url + 'usuarios/ListaAreaInterna', {
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
      this.url + 'usuarios/ActualizacionAreaInterna',
      {
        params: queryParams,
      }
    );
  }
  /**
   * POST operacion/AsignacionUsuarioInspector
   */
}
