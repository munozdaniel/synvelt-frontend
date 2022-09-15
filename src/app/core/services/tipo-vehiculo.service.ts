import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import {
  ITipoVehiculo,
  ITipoVehiculoListaParams,
} from 'app/models/ITipoVehiculo';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class TipoVehiculoService {
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
    parametros?: ITipoVehiculoListaParams
  ): Observable<ITipoVehiculo[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaTipoVehiculo', {
      params: queryParams,
    });
  }
  //
  guardar(id: string, parametros: any): Observable<ITipoVehiculo> {
    const queryParams = this.setQueryParams({ id });
    return this._http.post<ITipoVehiculo>(
      this.url + 'operacion/ActualizacionTipoVehiculo',
      { ...parametros },
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }

  //
  eliminar(id): Observable<void> {
    const queryParams = this.setQueryParams({ id });
    return this._http.post<void>(this.url + 'operacion/BajaTipoVehiculo', {
      headers: this.headers,
      params: queryParams,
    });
  }
}
