import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

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
    private _userService: UserService
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
          valor = value ? (value as string) : '';
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
    console.log('accessTokenSynvelt', token);
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

    console.log('signIn', credentials);
    return this._httpClient
      .get(this.url + 'autorizacion/ValidacionUsuario', {
        params: queryParams,
        headers: this.headers,
      })
      .pipe(
        switchMap((response: any) => {
          console.log('response', response);
          // Store the access token in the local storage
          this.accessToken = response.id;

          // Set the authenticated flag to true
          this._authenticated = true;

          // Store the user on the user service
          //   TODO: Pedir que devuelva el usuario
          //   this._userService.user = response.user;
          this._userService.user = {
            id: response.id,
            nombre: 'Admin',
            direccionMail: 'admin@synvelt.com',
            apellido: 'Testing',
          };
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
  //     console.log('Esto no está hecho; signInUsingToken');
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
    // Remove the access token from the local storage
    localStorage.removeItem('accessTokenSynvelt');

    // Set the authenticated flag to false
    this._authenticated = false;

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
