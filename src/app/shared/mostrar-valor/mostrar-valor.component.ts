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
      <div
        *ngSwitchCase="'empresas'"
        class="flex flex-col justify-between gap-1 flex-wrap"
      >
        <div *ngIf="valor; else sinEmpresas">
          <span *ngFor="let item of valor">
            {{ item?.razon_social }}
          </span>
        </div>
        <ng-template #sinEmpresas>
          <span>No hay empresas asignadas</span>
        </ng-template>
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

    <mat-icon *ngIf="!valor" svgIcon="heroicons_outline:minus-sm"></mat-icon>
  `,
  styles: [],
})
export class MostrarValorComponent implements OnInit, OnChanges {
  @Input() valor: any;
  @Input() tipoValor: string;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.valor && changes.valor.currentValue) {
    }
    if (changes.tipoValor && changes.tipoValor.currentValue) {
    }
  }

  ngOnInit(): void {}
}
