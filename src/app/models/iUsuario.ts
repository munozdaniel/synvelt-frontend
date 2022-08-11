import { IRol } from './iRol';

export interface IUsuario {
  id: string;
  apellido: string;
  claveLogin?: string;
  comentario?: string; // (opcional, máxima longitud: 4000)
  cuil?: number; // C.U.I.L. - Numérico, máxima longitud: 11 - Debe mostrarse con el formato 00-00000000-0
  direccionMail?: string;

  fechaActualizacion?: string;
  fechaBaja?: string; // Si es null está activo
  idAreaInterna?: string;
  idEstadoEntidad?: string;

  idInspector?: string;
  idRolPrincipal?: string;

  nombre: string;
  nombreLogin?: string;
  telefono?: number;

  //   fechaUtcActualizacion?: string;
  estado?: string;
  //   En t de ejecucion
  rol?: IRol;
}

export interface IUsuarioFilter {
  nombreCompleto?: string;
  estado?: string;
  cuit?: string;
  rol?: string;
  idAreaInterna?: string;
}

export const LISTAR_USUARIOS: IUsuario[] = [
  {
    apellido: 'sample string 1',
    claveLogin: 'sample string 2',
    comentario: 'sample string 3',
    cuil: 1.0,
    direccionMail: 'sample string 4',
    fechaActualizacion: '2022-08-08T17:05:31.9851131-07:00',
    fechaBaja: '2022-08-08T17:05:31.9851131-07:00',
    id: 'a2cb6213-f052-4653-af92-977b1c7ef6d1',
    idAreaInterna: '1a3847f8-b454-4a7c-b420-38ea0102f38d',
    idEstadoEntidad: '8ddef7d6-15d9-47f9-9873-ea39a66eb300',
    idInspector: '3d8d5727-5589-4a18-a8fd-706fb9810b32',
    idRolPrincipal: '36f6df95-5c21-418f-bb64-9806a34cf827',
    nombre: 'sample string 7',
    nombreLogin: 'sample string 8',
    telefono: 1.0,
  },
  {
    apellido: 'sample string 1',
    claveLogin: 'sample string 2',
    comentario: 'sample string 3',
    cuil: 1.0,
    direccionMail: 'sample string 4',
    fechaActualizacion: '2022-08-08T17:05:31.9851131-07:00',
    fechaBaja: '2022-08-08T17:05:31.9851131-07:00',
    id: 'a2cb6213-f052-4653-af92-977b1c7ef6d1',
    idAreaInterna: '1a3847f8-b454-4a7c-b420-38ea0102f38d',
    idEstadoEntidad: '8ddef7d6-15d9-47f9-9873-ea39a66eb300',
    idInspector: '3d8d5727-5589-4a18-a8fd-706fb9810b32',
    idRolPrincipal: '36f6df95-5c21-418f-bb64-9806a34cf827',
    nombre: 'sample string 7',
    nombreLogin: 'sample string 8',
    telefono: 1.0,
  },
];
