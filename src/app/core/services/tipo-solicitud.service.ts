import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import {
  ITipoSolicitud,
  ITipoSolicitudListaParams,
} from 'app/models/ITipoSolicitud';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class TipoSolicitudService {
  protected headers = new HttpHeaders().append(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient, private _authService: AuthService) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      Object.entries(parametros).forEach(([key, value], index) => {
        // queryParams = queryParams.set(key, value ? (value as string) : '');
        let valor = '';
        if (typeof value === 'boolean') {
          valor = value ? 'true' : 'false';
        } else {
          //   valor = value ? (value as string) : '';
          valor = value ? encodeURIComponent(value as any) : '';
        }
        queryParams = queryParams.set(key, valor);
      });
    }
    return queryParams;
  }
  /**
   *
   * @param parametros
   * @returns
   */
  obtenerTodos(
    parametros?: ITipoSolicitudListaParams
  ): Observable<ITipoSolicitud[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaTipoSolicitud', {
      params: queryParams,
    });
  }
  //
  guardar(id: string, parametros: any): Observable<ITipoSolicitud> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'multipart/form-data'
    );
    const queryParams = this.setQueryParams({ id });
    return this._http.post<ITipoSolicitud>(
      this.url + 'operacion/ActualizacionTipoSolicitud',
      { ...parametros },
      {
        headers: headers,
        params: queryParams,
      }
    );
  }

  //
  eliminar(id): Observable<void> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'multipart/form-data'
    );
    const queryParams = this.setQueryParams({ id });
    return this._http.get<void>(this.url + 'operacion/BajaTipoSolicitud', {
      headers: headers,
      params: queryParams,
    });
  }
}
