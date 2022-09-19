import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import { IVehiculo, IVehiculoListarParams } from 'app/models/IVehiculo';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
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
  obtenertodos(parametros?: IVehiculoListarParams): Observable<IVehiculo[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaVehiculo', {
      params: queryParams,
    });
  }
  //
  guardar(id: string, parametros: any): Observable<IVehiculo> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'multipart/form-data'
    );
    const queryParams = this.setQueryParams({ id });
    // const bodyParams = this.setBodyParams(parametros)
    return this._http.post<IVehiculo>(
      this.url + 'operacion/ActualizacionVehiculo',
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
    return this._http.get<void>(this.url + 'operacion/BajaVehiculo', {
      headers: this.headers,
      params: queryParams,
    });
  }
}
