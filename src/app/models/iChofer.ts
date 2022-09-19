import { IAreaInterna } from './iAreaInterna';
import { IEstadoEntidad } from './iEstadoEntidad';

export interface IChofer {
  id?: string;
  nombre: string;
  apellido: string;
  contacto: string;
  idAreaInterna: string;
  idEstadoEntidad: string;
  comentario: string;
  //
  estadoEntidad?: IEstadoEntidad;
  areaInterna?: IAreaInterna;
}
