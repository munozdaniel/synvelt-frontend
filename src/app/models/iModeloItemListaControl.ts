import { IModeloTipoDato } from './iModeloTipoDato';

export interface IModeloItemListaControl {
  id: number;
  idModeloListaControl?: number;
  idModeloTipoDato: number;
  orden: number;
  nombre: string;
  multipleSeleccion: boolean;
  multiplesValores: boolean;
  formato: string;
  longitudMaxima: number;
  metodoSeleccion: string;
  columnaDescripcion: string;
  columnaSeleccion: string;
  columnaValor: string;
  opcional: boolean;
  vigente: boolean;
  visibleUsuarioGeneral: boolean;
  editable: boolean;
  agrupacion?: string; //

  modeloTipoDato?: IModeloTipoDato;
}
export interface IModeloItemListaControlParam {
  idModeloListaControl: number;
}
