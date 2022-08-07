import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'mostrar-valor',
  template: `
    <span [ngSwitch]="tipoValor">
      <div *ngSwitchCase="'date'">
        <span *ngIf="valor">{{ valor | date: 'dd/MM/yyyy':'GMT' }}</span>
      </div>
      <div *ngSwitchCase="'boolean'">
        <span *ngIf="valor">
          <mat-icon
            class="text-green-700"
            svgIcon="heroicons_outline:check-circle"
          ></mat-icon>
        </span>
        <span *ngIf="!valor">
          <mat-icon
            class="text-red-700"
            svgIcon="heroicons_outline:x-circle"
          ></mat-icon>
        </span>
      </div>

      <div *ngSwitchCase="'imagen'">
        <imagen [filename]="valor.filename" class="relative"></imagen>
      </div>
      <div *ngSwitchCase="'archivo'">
        <app-mostrar-tipo-archivo
          [ocultarEliminar]="true"
          [habilitacionId]="valor._id"
          [filename]="valor.filename"
        ></app-mostrar-tipo-archivo>
      </div>
      <div *ngSwitchDefault>
        <span *ngIf="valor">{{ valor }}</span>
      </div>
    </span>

    <mat-icon
      *ngIf="!valor && tipoValor !== 'boolean'"
      svgIcon="heroicons_outline:minus-sm"
    ></mat-icon>
  `,
  styles: [],
})
export class MostrarValorComponent implements OnInit, OnChanges {
  @Input() valor: any;
  @Input() tipoValor: 'boolean' | 'date' | 'imagen' | 'archivo' | 'string' =
    'string';
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.valor && changes.valor.currentValue) {
    }
    if (changes.tipoValor && changes.tipoValor.currentValue) {
    }
  }

  ngOnInit(): void {}
}
