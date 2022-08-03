import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido-expansible',
  template: `
    <section *ngFor="let item of elementos" class="w-full">
      <div
        *ngIf="!item.ocultar"
        class="flex flex-row justify-between w-full px-3 py-1"
      >
        <strong class="titulo_celda">{{ item.nombre }}</strong>
        <div>
          <mostrar-valor
            [tipoValor]="item.tipoValor"
            [valor]="item.valor"
          ></mostrar-valor>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class ContenidoExpansibleComponent implements OnInit, OnChanges {
  @Input() elementos: {
    hideMd: boolean;
    nombre: string;
    valor: string;
    ocultar?: boolean;
    tipoValor?: string;
  }[]; // md si se muestra en pantallas > Medium
  // Mobile
  isMobile: boolean;
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    public breakpointObserver: BreakpointObserver,
    private _router: Router
  ) {
    this.mobileQuery = this._media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.elementos && changes.elementos.currentValue) {
      if (this.isMobile) {
        this.elementos = this.elementos;
      } else {
        this.elementos = this.elementos.filter(x => !x.hideMd);
      }
    }
  }
  ngOnInit(): void {}
}
