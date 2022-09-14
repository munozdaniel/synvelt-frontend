import { IEstadoEntidad } from './iEstadoEntidad';

export interface ITipoArchivoAdjunto {
  id?: string;
  nombre: string;
  extensiones: any[];
  idEstadoEntidad: string;
  //
  estadoEntidad?: IEstadoEntidad;
}

export interface ITipoArchivoAdjuntoListaParam {
  id?: string;
  idEstado?: string;
}
