import { Injectable } from '@angular/core';
import { SynveltConfirmationService } from '@synvelt/services/confirmation';
const ICON: any = {
  show: true,
  name: 'heroicons_outline:exclamation',
  color: 'warn',
};
const ACTIONS: any = {
  confirm: {
    show: true,
    label: 'Eliminar',
    color: 'warn',
  },
  cancel: {
    show: true,
    label: 'Cancelar',
  },
};
@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  /**
   * Constructor
   */
  constructor(
    private _synveltConfirmationService: SynveltConfirmationService
  ) {}

  showMessage(error) {
    if (error) {
      this.verify(error.status);
    } else {
      this._synveltConfirmationService.error();
    }
    console.log('[ERROR]', error);
  }
  private verify(status) {
    switch (status) {
      case 401:
        this.show(
          'Sin autorización',
          'El usuario no tiene los permisos correspondientes.'
        );
        break;
      case 403:
        this.show('Acceso prohibido', 'El id recibido no es válido.');
        break;
      case 404:
        this.show('Petición erronéa', 'El token no es válido.');
        break;
      case 408:
        this.show('Sin Acceso', 'El token ha expirado');
        break;

      default:
        this._synveltConfirmationService.error();
        break;
    }
  }
  private show(title: string, message: string, icon = ICON, actions = ACTIONS) {
    console.log('[' + title + ']', message);
    this._synveltConfirmationService.error();
    // this._synveltConfirmationService.open({
    //   title,
    //   message,
    //   icon,
    //   actions,
    // });
  }
}
