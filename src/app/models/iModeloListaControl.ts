import { IModeloItemListaControl } from './iModeloItemListaControl';

export interface IModeloListaControl {
  id: number;
  nombre?: string;
  comentario?: string;
  vigente: boolean;

  cargando?: boolean;
  items?: IModeloItemListaControl[];
}
export interface IModeloListaControlParam {
  id: number;
  vigente: boolean;
}
