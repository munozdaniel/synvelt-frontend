import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { merge } from 'lodash-es';
import { SynveltConfirmationDialogComponent } from '@synvelt/services/confirmation/dialog/dialog.component';
import { SynveltConfirmationConfig } from '@synvelt/services/confirmation/confirmation.types';

@Injectable()
export class SynveltConfirmationService {
  private _defaultConfig: SynveltConfirmationConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn',
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirm',
        color: 'warn',
      },
      cancel: {
        show: true,
        label: 'Cancel',
      },
    },
    dismissible: false,
  };

  /**
   * Constructor
   */
  constructor(private _matDialog: MatDialog) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: SynveltConfirmationConfig = {}
  ): MatDialogRef<SynveltConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(SynveltConfirmationDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'synvelt-confirmation-dialog-panel',
    });
  }
  // Metodos personalizados:
  success(
    title = 'Operación éxitosa',
    message = 'El proceso ha finalizado correctamente',
    icon?
  ): MatDialogRef<SynveltConfirmationDialogComponent> {
    if (!icon) {
      icon = {
        name: 'heroicons_outline:check-circle',
        color: 'success',
      };
    }
    return this.open({
      title,
      message,
      icon,
      actions: {
        confirm: {
          label: 'Aceptar',
          color: 'primary',
        },
        cancel: {
          show: false,
        },
      },
    });
  }
  error(
    title = 'Operación fallida',
    message = 'Ocurrió un error, la operación no se ha completado'
  ): MatDialogRef<SynveltConfirmationDialogComponent> {
    return this.open({
      title,
      message,
      actions: {
        confirm: {
          label: 'Aceptar',
          color: 'primary',
        },
        cancel: {
          show: false,
        },
      },
    });
  }
}
