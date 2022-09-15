import { IEstadoEntidad } from './iEstadoEntidad';
import { ITipoVehiculo } from './ITipoVehiculo';

export interface IVehiculo {
  id?: string;
  marca: string;
  patente: string;
  año: number;
  idTipoVehiculo: string;
  idEstadoEntidad: string;
  //
  tipoVehiculo?: ITipoVehiculo;
  estadoEntidad?: IEstadoEntidad;
}
// ?id={id}&idTipo={idTipo}&patente={patente}&idEstado={idEstado}
export interface IVehiculoListarParams {
  id?: string;
  idTipo?: string;
  patente?: string;
  idEstado?: string;
}
