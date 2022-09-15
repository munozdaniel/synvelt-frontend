import { IEstadoEntidad } from './iEstadoEntidad';

export interface ITipoArchivo {
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
