import { IEstadoEntidad } from './iEstadoEntidad';

export interface IPreguntaFrecuente {
    id?: string;
    titulo: string;
    explicacion: string;
    agrupacion: string;
    idEstadoEntidad: string;
    //
    estadoEntidad?: IEstadoEntidad;
  }

  export interface IPreguntaFrecuenteListaParams {
    id?: string;
    agrupacion?: string;
    idEstado?: string;
  }
