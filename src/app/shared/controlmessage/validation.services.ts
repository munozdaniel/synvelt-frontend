import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class ValidationService {
  /**
   * Gestiona los mensajes que se muestran en el html cuando se utiliza <control-messages>
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Este campo es requerido.',
      noEsObjeto: 'Debe seleccionar el item de la lista.',
      desdeMenorHasta: 'La fecha inicial debe ser mayor a la final',
      alMenosUnItemEnElArreglo: 'Seleccione al menos un item del listado',
    };

    return config[validatorName];
  }
  /**
   * Verifica que una fecha sea menor a otra
   *
   * @param desde
   * @param hasta
   */
  static desdeMenorHastaIfExistHasta(desde: string, hasta: string) {
    return (group: FormGroup): { [key: string]: any } => {
      if (!group.controls[hasta] || !group.controls[hasta].value) {
        return {};
      }
      const f = group.controls[desde];
      const t = group.controls[hasta];
      if (!f || f.value == null) {
        return {};
      }
      if (!t || t.value == null) {
        return {};
      }
      if (f.value > t.value) {
        return { desdeMenorHasta: true };
      }
      return {};
    };
  }
  /**
   * Verifica que una fecha sea menor a otra
   *
   * @param desde
   * @param hasta
   */
  static desdeMenorHasta(desde: string, hasta: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const f = group.controls[desde];
      const t = group.controls[hasta];
      if (!f || f.value == null) {
        return {};
      }
      if (!t || t.value == null) {
        return {};
      }
      if (f.value > t.value) {
        return { desdeMenorHasta: true };
      }
      return {};
    };
  }
  /**
   * Exige que se seleccione al menos  un item de la lista
   *
   * @param control
   * @returns
   */
  static alMenosUnItemEnElArreglo(control: AbstractControl) {
    if (!control.value) {
      return { alMenosUnItemEnElArreglo: true };
    }
    if (control.value.id) {
      return null;
    } else {
      return { alMenosUnItemEnElArreglo: true };
    }
  }
  /**
   * Verifica que haya seleccionado un objeto de la lista de objetos. Se usa en los autocomplete.
   * Metodos para mostrar el error:
   *  1. <app-control-messages [control]="form.controls?.campo"></app-control-messages>
   *  2. <mat-error *ngIf="form.errors?.esObjeto"> Seleccione el item de la lista. </mat-error>
   *
   * @param control
   * @returns
   */
  static esObjetoRequerido(control: AbstractControl) {
    if (!control.value) {
      return { noEsObjeto: true };
    }
    if (typeof control.value === 'string') {
      return { noEsObjeto: true };
    }
    if (control.value && control.value.id) {
      return null;
    } else {
      return { noEsObjeto: true };
    }
  }
  static esObjeto(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    if (typeof control.value === 'string') {
      return { noEsObjeto: true };
    }
    if (control.value && control.value.id) {
      return null;
    } else {
      return { noEsObjeto: true };
    }
  }
  /**
   * Verifica que haya seleccionado un objeto de la lista de objetos. Se usa en los autocomplete.
   * Metodos para mostrar el error:
   *  1. <app-control-messages [control]="form.controls?.campo"></app-control-messages>
   *  2. <mat-error *ngIf="form.errors?.esObjeto"> Seleccione el item de la lista. </mat-error>
   *
   * @param control
   * @returns
   */
  static esObjetoOrNull(control: AbstractControl) {
    if (!control.value) {
      return null;
    }
    if (typeof control.value === 'string') {
      return { noEsObjeto: true };
    }
    if (control.value && control.value.id) {
      return null;
    } else {
      return { noEsObjeto: true };
    }
  }
}
