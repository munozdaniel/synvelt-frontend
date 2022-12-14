import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IModeloTipoBase } from 'app/models/iModeloTipoBase';
import {
  IModeloTipoDato,
  IModeloTipoDatoParam,
} from 'app/models/iModeloTipoDato';
import {
  IModeloListaControlParam,
  IModeloListaControl,
} from 'app/models/iModeloListaControl';
import {
  IModeloItemListaControlParam,
  IModeloItemListaControl,
} from 'app/models/iModeloItemListaControl';
@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  protected headers = new HttpHeaders().append(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  protected url = environment.url;
  ejemplo = [
    {
      id: null,
      idModeloTipoDato: 'f700a7f2-678f-43ba-820f-49ac99a212f5',
      orden: 10,
      nombre: 'nombre',
      multipleSeleccion: false,
      multiplesValores: false,
      formato: null,
      longitudMaxima: null,
      metodoSeleccion: null,
      columnaDescripcion: null,
      columnaSeleccion: null,
      columnaValor: null,
      opcional: true,
      vigente: true,
      visibleUsuarioGeneral: true,
      editable: true,
      agrupacion: null,
    },
    {
      id: null,
      idModeloTipoDato: 'f700a7f2-678f-43ba-820f-49ac99a212f5',
      orden: 10,
      nombre: 'apellido',
      multipleSeleccion: false,
      multiplesValores: false,
      formato: null,
      longitudMaxima: null,
      metodoSeleccion: null,
      columnaDescripcion: null,
      columnaSeleccion: null,
      columnaValor: null,
      opcional: true,
      vigente: true,
      visibleUsuarioGeneral: true,
      editable: true,
      agrupacion: null,
    },
  ];
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      Object.entries(parametros).forEach(([key, value], index) => {
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
  //   ==============================================================
  /**
   * POST modelos/ActualizacionModeloListaControl?nombre={nombre}&codigoTipoBase={codigoTipoBase}&vigente={vigente}&id={id}
   * Actualizaci??n de un modelo de tipo de dato
   *
   * @param parametros
   * @returns
   */
  actualizacionModeloListaControl(
    parametros?: IModeloListaControl,
    body?: IModeloItemListaControl[]
  ): Observable<string> {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'My-Custom-Header': 'foobar',
    // };
    const headers = new HttpHeaders().append(
      'Content-Type',
      'multipart/form-data'
    );
    const queryParams = this.setQueryParams(parametros);
    // const param = {
    //   id: null,
    //   nombre: 'random99',
    //   comentario: 'uncomentario',
    //   vigente: true,
    // };
    // const queryParams = this.setQueryParams(param);
    return this._http.post<any>(
      this.url + 'modelos/ActualizacionModeloListaControl',
      body,
      {
        params: queryParams,
        headers: headers,
      }
    );
  }
  /**
   * POST modelos/ActualizacionModeloTipoDato?nombre={nombre}&codigoTipoBase={codigoTipoBase}&vigente={vigente}&id={id}
   * Actualizaci??n de un modelo de tipo de dato
   *
   * @param parametros
   * @returns
   */
  actualizacionModeloTipoDato(
    parametros?: IModeloTipoDato
  ): Observable<string> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.post<any>(
      this.url + 'modelos/ActualizacionModeloTipoDato',
      {},
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
  /**
   * (Items)
   * GET modelos/SeleccionModeloItemListaControl?idModeloListaControl={idModeloListaControl}
   * Selecci??n de modelos de ??tems de un modelo de lista de control
   *
   * @param parametros
   * @returns
   */
  obtenerModelosItemListaControl(
    parametros?: IModeloItemListaControlParam
  ): Observable<IModeloItemListaControl[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(
      this.url + 'modelos/SeleccionModeloItemListaControl',
      {
        headers: this.headers,
        params: queryParams,
      }
    );
  }
  /**
   * (Padre)
   * GET modelos/SeleccionModeloListaControl?id={id}&vigente={vigente}
   * Selecci??n de modelos de lista de control
   *
   * @param parametros
   * @returns
   */
  obtenerModelosListaControl(
    parametros?: IModeloListaControlParam
  ): Observable<IModeloListaControl[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(
      this.url + 'modelos/SeleccionModeloListaControl',
      {
        params: queryParams,
      }
    );
  }
  /**
   * GET modelos/SeleccionTipoDato?id={id}&codigoTipoBase={codigoTipoBase}&vigente={vigente}
   * Selecci??n de modelos de tipos de dato
   *
   * @param parametros
   * @returns
   */
  obtenerModeloTipoDato(
    parametros?: IModeloTipoDatoParam
  ): Observable<IModeloTipoDato[]> {
    const queryParams = this.setQueryParams(parametros);
    return this._http.get<any>(this.url + 'modelos/SeleccionModeloTipoDato', {
      headers: this.headers,
      params: queryParams,
    });
  }
  /**
   * GET modelos/SeleccionTipoBase
   * Lista de tipos base para asignar a modelos de tipo de dato
   *
   * @param parametros
   * @returns
   */
  obtenerModelosTipoBase(): Observable<IModeloTipoBase[]> {
    return this._http.get<any>(this.url + 'modelos/SeleccionTipoBase');
  }
  // =========================================================
  eliminar(id: string): Observable<boolean> {
    return this._http.get<any>(
      this.url + `modelos/EliminacionModeloListaControl?id=${id}`
    );
  }
}
