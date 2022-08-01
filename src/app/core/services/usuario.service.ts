import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from 'app/models/iUsuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  protected url = environment.url;
  /**
   * Constructor
   */
  constructor(private _http: HttpClient) {}

  //   agregar(): Observable<IUsuario> {}
  //   actualizar(): Observable<IUsuario> {}
  //   eliminar(): Observable<IUsuario> {}
  //   listar(): Observable<IUsuario[]> {}
  //   buscar(): Observable<IUsuario[]> {}
}
