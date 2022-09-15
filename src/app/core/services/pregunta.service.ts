import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import {
  IPreguntaFrecuente,
  IPreguntaFrecuenteListaParams,
} from 'app/models/iPreguntaFrecuente';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class PreguntaFrecuenteService {
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
  obtenertodos(
    parametros?: IPreguntaFrecuenteListaParams
  ): Observable<IPreguntaFrecuente[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaPreguntaFrecuente', {
      params: queryParams,
    });
  }

  guardar(id: string, parametros: any): Observable<IPreguntaFrecuente> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'multipart/form-data'
    );
    const queryParams = this.setQueryParams({ id });
    return this._http.post<IPreguntaFrecuente>(
      this.url + 'operacion/ActualizacionLocalidad',
      { ...parametros },
      {
        headers: headers,
        params: queryParams,
      }
    );
  }

  //
  eliminar(id): Observable<void> {
    const queryParams = this.setQueryParams({ id });
    return this._http.post<void>(this.url + 'operacion/BajaPreguntaFrecuente', {
      headers: this.headers,
      params: queryParams,
    });
  }
}
