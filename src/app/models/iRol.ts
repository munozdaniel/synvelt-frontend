export interface IRol {
  id?: string;
  esAdministradorDatos?: boolean;
  esAdministradorAplicacion?: boolean;

  descripcion?: string;
  nombre: string;
  cantidadUsuarios: number;
}
