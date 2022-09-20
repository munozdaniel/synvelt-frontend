import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { IUsuario } from 'app/models/iUsuario';
import { untilDestroyed } from '@ngneat/until-destroy';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<IUsuario> = new ReplaySubject<IUsuario>(1);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: IUsuario) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<IUsuario> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  //   /**
  //    * Get the current logged in user data
  //    */
  get(): Observable<IUsuario> {
    // No lo uso, es para obtener el usuario logueado
    // const usuarioString = localStorage.getItem('accessTokenSynvelt') ?? '';
    // if (usuarioString !== 'undefined' && usuarioString !== '') {
    //   const usuario: IUsuario = JSON.parse(usuarioString);
    //   this._user.next(usuario);
    //   return of(usuario);
    const userString = localStorage.getItem('userSynvelt') ?? '';
    if (userString && userString !== 'undefined') {
      const user = JSON.parse(userString);
      this._user.next(user);
      return of(user);
    }
    return of(null);
    //  return this._httpClient.get<User>('api/common/user').pipe(
    //    tap(user => {
    //      this._user.next(user);
    //    })
    //  );
  }

  //   /**
  //    * Update the user
  //    *
  //    * @param user
  //    */
  //   update(user: User): Observable<any> {
  //     return this._httpClient.patch<User>('api/common/user', { user }).pipe(
  //       map(response => {
  //         this._user.next(response);
  //       })
  //     );
  //   }
}
