import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRol } from 'app/models/iRol';
@Injectable({
  providedIn: 'root',
})
export class RolService {
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      if (parametros.esAdministradorAplicacion) {
        queryParams = queryParams.append(
          'esAdministradorAplicacion',
          parametros.esAdministradorAplicacion
        );
      }
      if (parametros.esAdministradorDatos) {
        queryParams = queryParams.append(
          'esAdministradorDatos',
          parametros.esAdministradorDatos
        );
      }

      if (parametros.id) {
        queryParams = queryParams.append('id', parametros.id);
      }
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
  guardar(rol: IRol): Observable<IRol> {
    return this._http.post<IRol>(this.url + 'usuarios/Rol', rol);
  }
  buscar(parametros?: any): any {
    console.log('buscar', parametros);
    const queryParams = this.setQueryParams(parametros);
    return this._http.get(this.url + 'roles/Lista', {
      params: queryParams,
    });
  }
  eliminar(id): Observable<void> {
    return this._http.put<void>(this.url + `roles/Baja?id=${id}`, null);
  }
}
