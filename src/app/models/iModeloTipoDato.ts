export interface IModeloTipoDato {
  id: number;
  nombre?: string;
  codigoTipoBase: number;
  vigente: boolean;
}
export interface IModeloTipoDatoParam {
  id: number;
  codigoTipoBase: number;
  vigente: boolean;
}
