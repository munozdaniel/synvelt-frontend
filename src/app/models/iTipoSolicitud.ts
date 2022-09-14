import { IEstadoEntidad } from './iEstadoEntidad';

export interface ITipoSolicitud {
  id?: string;
  nombre: string;
  extensiones: any[];
  idEstadoEntidad: string;
  //
  estadoEntidad?: IEstadoEntidad;
}

export interface ITipoSolicitudListaParams {
  id?: string;
  idEstado?: string;
}
