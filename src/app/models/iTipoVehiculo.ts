import { IEstadoEntidad } from './iEstadoEntidad';

export interface ITipoVehiculo {
  id?: string;
  nombre: string;
  extensiones: any[];
  idEstadoEntidad: string;
  //
  estadoEntidad?: IEstadoEntidad;
}

export interface ITipoVehiculoListaParams {
  id?: string;
  idEstado?: string;
}
