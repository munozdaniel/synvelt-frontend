export interface IUsuario {
  id: string;
  nombre: string;
  apellido: string;
  cuil?: string;
  cuit?: string;
  estado?: string;
  areaMunicipal?: string;

  claveLogin?: string;
  direccionMail?: string;
  fechaUtcActualizacion?: string;
  idInspector?: string;
  idRolPrincipal?: string;
  nombreLogin?: string;
  //     <Apellido>Van Gogh</Apellido>
  // <ClaveLogin>testnocifrado</ClaveLogin>
  // <Cuil i:nil="true"/>
  // <DireccionMail>vincentvg@impresionismo.net</DireccionMail>
  // <FechaUtcActualizacion>2022-07-20T23:31:11.403</FechaUtcActualizacion>
  // <Id>1770d68a-ad5a-4650-aaec-1f3b8bdc266b</Id>
  // <IdInspector>3bf31f93-72a4-4708-af0d-3b7d0132a9f8</IdInspector>
  // <IdRolPrincipal>5a7d5dba-9768-43a5-a08b-6570ad56ce56</IdRolPrincipal>
  // <Nombre>Vincent</Nombre>
  // <NombreLogin>vincent</NombreLogin>
}
