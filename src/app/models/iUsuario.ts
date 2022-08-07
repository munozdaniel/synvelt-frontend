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

  areaMunicipal?: string;

  //   fechaUtcActualizacion?: string;
  estado?: string;
}

export interface IUsuarioFilter {
  nombreCompleto?: string;
  estado?: string;
  cuit?: string;
  rol?: string;
  areaMunicipal?: string;
}
