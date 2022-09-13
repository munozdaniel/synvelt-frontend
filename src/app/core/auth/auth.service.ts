import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, Observable, of, switchMap, throwError } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { UsuarioService } from '../services/usuario.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Injectable()
export class AuthService {
  protected headers = new HttpHeaders().append(
    'Content-Type',
    'application/x-www-form-urlencoded'
  );
  private _authenticated: boolean = false;
  protected url = environment.url;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    private _usuarioService: UsuarioService
  ) {}
  private setQueryParams(parametros) {
    let queryParams = new HttpParams();
    if (parametros) {
      Object.entries(parametros).forEach(([key, value], index) => {
        // queryParams = queryParams.set(key, value ? (value as string) : '');
        let valor = '';
        if (typeof value === 'boolean') {
          valor = value ? 'true' : 'false';
        } else {
          // valor = value ? (value as string) : '';
          valor = value ? encodeURIComponent(value as any) : '';
        }
        queryParams = queryParams.set(key, valor);
      });
    }
    return queryParams;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessTokenSynvelt', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessTokenSynvelt') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post('api/auth/forgot-password', email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post('api/auth/reset-password', password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { nombre: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('El usuario ya se encuentra logeuado');
    }
    const queryParams = this.setQueryParams(credentials);

    return this._httpClient
      .get(this.url + 'autorizacion/ValidacionUsuario', {
        params: queryParams,
        headers: this.headers,
      })
      .pipe(
        switchMap((response: any) => {
          //   const r = {
          //     apellido: 'General',
          //     direccionMail: 'adm@a.net',
          //     esAdministradorAplicacion: true,
          //     esAdministradorDatos: true,
          //     esInspector: true,
          //     expiracion: '2022-09-13T13:29:55.0204851-07:00',
          //     id: '4ef89051-ba37-48f2-ba66-f4e7857e3587',
          //     idRolPrincipal: '5a7d5dba-9768-43a5-a08b-6570ad56ce56',
          //     nombre: 'Administrador',
          //     nombreLogin: '20000000000',
          //     rolesUsuario:[]
          //   };
          console.log('response', response);
          // Store the access token in the local storage
          this.accessToken = response.id;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          //   TODO: Pedir que devuelva el usuario
          //   this._userService.user = response.user;
          const usuario = {
            id: response.id,
            nombre: response.nombre,
            apellido: response.apellido,
            direccionMail: response.direccionMail,
            nombreLogin: response.nombreLogin,
          };
          this._userService.user = { ...usuario };
          //
          console.log('guardarlocal', usuario);
          localStorage.setItem('userSynvelt', JSON.stringify(usuario));

          //   TODO: Asignar roles

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  /**
   * Sign in using the access token
   */
  //   signInUsingToken(): Observable<any> {
  //     // Renew token
  //     return this._httpClient
  //       .post('api/auth/refresh-access-token', {
  //         accessToken: this.accessToken,
  //       })
  //       .pipe(
  //         catchError(() =>
  //           // Return false
  //           of(false)
  //         ),
  //         switchMap((response: any) => {
  //           // Store the access token in the local storage
  //           this.accessToken = response.accessToken;

  //           // Set the authenticated flag to true
  //           this._authenticated = true;

  //           // Store the user on the user service
  //           this._userService.user = response.user;

  //           // Return true
  //           return of(true);
  //         })
  //       );
  //   }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    this._usuarioService
      .logout(this.accessToken)
      .pipe(
        finalize(() => {
          // Remove the access token from the local storage
          localStorage.removeItem('accessTokenSynvelt');
          localStorage.removeItem('userSynvelt');
          // Set the authenticated flag to false
          this._authenticated = false;
        }),
        untilDestroyed(this)
      )
      .pipe(untilDestroyed(this))
      .subscribe(
        datos => {
          console.log('[Sesión cerrada]');
        },
        error => {
          console.log('[ERROR]', error);
        }
      );
    //   .subscribe(
    //     datos => {
    //       // Remove the access token from the local storage
    //       localStorage.removeItem('accessTokenSynvelt');
    //       // Set the authenticated flag to false
    //       this._authenticated = false;
    //     },
    //     error => {
    //       console.log('[ERROR]', error);
    //     }
    //   );

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: {
    name: string;
    email: string;
    password: string;
    company: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    // if (AuthUtils.isTokenExpired(this.accessToken)) {
    //   return of(false);
    // }

    // If the access token exists and it didn't expire, sign in using it
    // return this.signInUsingToken();
    return of(true);
  }
}
