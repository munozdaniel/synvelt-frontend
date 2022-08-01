import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { SynveltNavigationItem } from '@synvelt/components/navigation';
import { horizontalNavigation } from 'app/mock-api/common/navigation/data';
import { cloneDeep } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private _defaultNavigation: SynveltNavigationItem[] = [];
  private _horizontalNavigation = horizontalNavigation;
  private _navigation: ReplaySubject<Navigation> =
    new ReplaySubject<Navigation>(1);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
    //     this._userService.user$.pipe(untilDestroyed(this)).subscribe(
    //         datos => {
    //           this.usuario = datos;
    //           switch (this.usuario.rol.nombre) {
    //   },
    //         error => {
    //           console.log('[ERROR]', error);
    //         }
    //       );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for navigation
   */
  get navigation$(): Observable<Navigation> {
    return this._navigation.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Get all navigation data
   */
  get(): Observable<Navigation> {
    const navigation = this.fillMenu();
    this._navigation.next(navigation);
    return of(navigation);
    // return this._httpClient.get<Navigation>('api/common/navigation').pipe(
    //   tap(navigation => {
    //     this._navigation.next(navigation);
    //   })
    // );
  }
  fillMenu(): Navigation {
    // Fill horizontal navigation children using the default navigation
    this._horizontalNavigation.forEach(horizontalNavItem => {
      this._defaultNavigation.forEach(defaultNavItem => {
        if (defaultNavItem.id === horizontalNavItem.id) {
          horizontalNavItem.children = cloneDeep(defaultNavItem.children);
        }
      });
    });
    const retorno = {
      horizontal: cloneDeep(this._horizontalNavigation),
    };
    return retorno;
  }
}
