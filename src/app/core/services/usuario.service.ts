import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      Object.entries(parametros).forEach(([key, value], index) => {
        queryParams = queryParams.set(key, value ? (value as string) : '');
      });
      //   if (typeof parametros.activo === 'boolean') {
      //     queryParams = queryParams.append('activo', parametros.activo);
      //   }
      //   if (parametros.apellido) {
      //     queryParams = queryParams.append('apellido', parametros.apellido);
      //   }
      //   if (parametros.comentario) {
      //     queryParams = queryParams.append('comentario', parametros.nombre);
      //   }
      //   if (parametros.nombre) {
      //     queryParams = queryParams.append('nombre', parametros.nombre);
      //   }
      //   if (parametros.nombreCompleto) {
      //     queryParams = queryParams.append('nombreCompleto', parametros.nombre);
      //   }
      //   if (parametros.cuil) {
      //     queryParams = queryParams.append('cuil', parametros.cuil);
      //   }
      //   if (parametros.idAreaInterna) {
      //     queryParams = queryParams.append(
      //       'idAreaInterna',
      //       parametros.idAreaInterna
      //     );
      //   }
      //   if (parametros.idRolPrincipal) {
      //     queryParams = queryParams.append(
      //       'idRolPrincipal',
      //       parametros.idRolPrincipal
      //     );
      //   }
      //   //

      //   if (parametros.claveLogin) {
      //     queryParams = queryParams.append('claveLogin', parametros.claveLogin);
      //   }

      //   if (parametros.direccionMail) {
      //     queryParams = queryParams.append(
      //       'direccionMail',
      //       parametros.direccionMail
      //     );
      //   }
      //   if (parametros.esInspector) {
      //     queryParams = queryParams.append('esInspector', parametros.esInspector);
      //   }
      //   if (parametros.id) {
      //     queryParams = queryParams.append('id', parametros.id);
      //   }

      //   if (parametros.nombreLogin) {
      //     queryParams = queryParams.append('nombreLogin', parametros.nombreLogin);
      //   }
      //   if (parametros.telefono) {
      //     queryParams = queryParams.append('telefono', parametros.telefono);
      //   }
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
}
