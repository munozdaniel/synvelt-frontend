import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthService } from '../auth/auth.service';
import { ILocalidad } from 'app/models/iLocalidad';
import { IEstadoEntidad } from 'app/models/iEstadoEntidad';
@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class EstadoEntidadService {
  private reloadEstadoEntidad$ = new Subject();
  private cacheEstadoEntidad$: Observable<IEstadoEntidad[]>;

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
  obtenerTodos(parametros?: any): Observable<IEstadoEntidad[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'operacion/ListaEstadoEntidad', {
      params: queryParams,
    });
  }
  obtenerTodosCache(parametros?: any): Observable<IEstadoEntidad[]> {
    if (!this.cacheEstadoEntidad$) {
      console.log('cache empty => refreshing');
      const queryParams = this.setQueryParams(parametros);
      this.cacheEstadoEntidad$ = this._http
        .get<any>(this.url + 'operacion/ListaEstadoEntidad', {
          params: queryParams,
        })
        .pipe(takeUntil(this.reloadEstadoEntidad$), shareReplay(1));
    }

    return this.cacheEstadoEntidad$;
  }

  forceReload() {
    this.reloadEstadoEntidad$.next(null);
    this.cacheEstadoEntidad$ = null;
  }
}
