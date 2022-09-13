import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { IUsuario, LISTAR_USUARIOS } from 'app/models/iUsuario';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  protected headers = new HttpHeaders().append(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  protected url = environment.url;
  private _httpSinToken: HttpClient;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient, handler: HttpBackend) {
    this._httpSinToken = new HttpClient(handler);
  }
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
   * PUT usuarios/Actualizacion?apellido={apellido}
   * &claveLogin={claveLogin}
   * &cuil={cuil}
   * &direccionMail={direccionMail}
   * &esInspector={esInspector}
   * &id={id}
   * &idAreaInterna={idAreaInterna}
   * &idRolPrincipal={idRolPrincipal}&nombre={nombre}
   * &nombreLogin={nombreLogin}
   * &telefono={telefono}
   * &comentario={comentario}
   *   */
  guardar(parametros: any): Observable<IUsuario> {
    const queryParams = this.setQueryParams(parametros);
    //   this.url + 'usuarios/Actualizacion',
    // return this._http.post<IUsuario>(this.url + 'usuarios/Actualizacion', {
    //   params: queryParams,
    // });
    return this._http.post<IUsuario>(
      this.url + 'usuarios/Actualizacion',
      {},
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
  //   actualizar(): Observable<IUsuario> {}
  /**
   * PUT usuarios/Eliminacion?id={id}
   */
  eliminar(id): Observable<void> {
    // return this._http.put<void>(this.url + `usuarios/Baja?id=${id}`, null);
    return this._http.get<void>(this.url + `usuarios/Baja?id=${id}`);
  }
  //   listar(): Observable<IUsuario[]> {}
  /**
   * GET usuarios/Lista?claveLogin={claveLogin}&esInspector={esInspector}&id={id}&idRolPrincipal={idRolPrincipal}&nombreLogin={nombreLogin}
   * Para consulta de usuarios
   */
  buscar(parametros?: any): any {
    const queryParams = this.setQueryParams(parametros);
    // let headers = new HttpHeaders();
    // const headers = new HttpHeaders().set('content-type',    );
    // const accept = 'application/json';
    // const contentType = 'application/json';
    // headers = headers.append('Accept', accept);
    // headers = headers.append('Content-Type', contentType);
    return this._http.get(this.url + 'usuarios/Lista', {
      params: queryParams,
    });
    return of(LISTAR_USUARIOS);
  }
  logout(idTokenUsuario): Observable<any> {
    // autorizacion/Logout?idTokenUsuario={idTokenUsuario}
    if (idTokenUsuario) {
      const queryParams = this.setQueryParams({ idTokenUsuario });
      return this._httpSinToken.get(this.url + 'autorizacion/Logout', {
        headers: this.headers,
        params: queryParams,
      });
    } else {
      return of(true);
    }
  }
  actualizarPassword(parametros: any): Observable<IUsuario> {
    const queryParams = this.setQueryParams(parametros);

    return this._http.post<IUsuario>(
      this.url + 'usuarios/ActualizacionClave',
      {},
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
}
