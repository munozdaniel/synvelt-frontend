import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { IUsuario } from 'app/models/iUsuario';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      if (parametros.apellido) {
        queryParams = queryParams.append('apellido', parametros.apellido);
      }
      if (parametros.claveLogin) {
        queryParams = queryParams.append('claveLogin', parametros.claveLogin);
      }
      if (parametros.cuil) {
        queryParams = queryParams.append('cuil', parametros.cuil);
      }
      if (parametros.direccionMail) {
        queryParams = queryParams.append(
          'direccionMail',
          parametros.direccionMail
        );
      }
      if (parametros.esInspector) {
        queryParams = queryParams.append('esInspector', parametros.esInspector);
      }
      if (parametros.id) {
        queryParams = queryParams.append('id', parametros.id);
      }
      if (parametros.idRolPrincipal) {
        queryParams = queryParams.append(
          'idRolPrincipal',
          parametros.idRolPrincipal
        );
      }
      if (parametros.nombre) {
        queryParams = queryParams.append('nombre', parametros.nombre);
      }
      if (parametros.nombreLogin) {
        queryParams = queryParams.append('nombreLogin', parametros.nombreLogin);
      }
    }
    return queryParams;
  }
  /**
   * PUT usuarios/Actualizacion?apellido={apellido}&claveLogin={claveLogin}&cuil={cuil}&direccionMail={direccionMail}
   * &esInspector={esInspector}&id={id}&idRolPrincipal={idRolPrincipal}&nombre={nombre}&nombreLogin={nombreLogin}
   *   */
  guardar(parametros: any): Observable<IUsuario> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.put<IUsuario>(
      this.url + 'usuarios/Actualizacion',
      {},
      {
        params: queryParams,
      }
    );
  }
  //   actualizar(): Observable<IUsuario> {}
  /**
   * PUT usuarios/Eliminacion?id={id}
   */
  eliminar(id): Observable<void> {
    return this._http.put<void>(
      this.url + `usuarios/Eliminacion?id=${id}`,
      null
    );
  }
  //   listar(): Observable<IUsuario[]> {}
  /**
   * GET usuarios/Lista?claveLogin={claveLogin}&esInspector={esInspector}&id={id}&idRolPrincipal={idRolPrincipal}&nombreLogin={nombreLogin}
   * Para consulta de usuarios
   */
  buscar(parametros?: any): any {
    const queryParams = this.setQueryParams(parametros);
    let headers = new HttpHeaders();
    // const headers = new HttpHeaders().set('content-type',    );
    const accept = 'application/json';
    const contentType = 'application/json';
    headers = headers.append('Accept', accept);
    headers = headers.append('Content-Type', contentType);
    return this._http.get('http://asdrovia.com/AdmInsp/usuarios/Lista');
    return of([
      {
        Apellido: 'Windsor',
        ClaveLogin: 'testnocifrado',
        Cuil: null,
        DireccionMail: 'elizabeth@windsor.org',
        FechaActualizacion: '2022-07-20T23:31:17.41',
        FechaBaja: null,
        Id: '2d8f1bb7-c993-4913-8c9f-6c526999b4e0',
        IdInspector: null,
        IdRolPrincipal: '5a7d5dba-9768-43a5-a08b-6570ad56ce56',
        Nombre: 'Elizabeth',
        NombreLogin: 'erii',
      },
    ]);
  }
}
