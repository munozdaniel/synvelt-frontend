import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'imagen',
  template: `
    <div>
      <a
        *ngIf="src; else noDisponible"
        [href]="src"
        target="_blank"
        class="relative cursor-zoom-in"
      >
        <mat-icon>search</mat-icon>
        <img
          [src]="src"
          alt="Foto Vehiculo"
          class=""
          [ngStyle]="{ width: width, height: height }"
      /></a>
      <ng-template #noDisponible>
        <img
          *ngIf="!ocultarSiNoExiste"
          src="assets/images/no-disponible.jpg"
          alt="Vehiculo Sin Foto"
          [ngStyle]="{ width: width, height: height }"
        />
      </ng-template>
    </div>
  `,
  styles: [
    `
      img {
        object-fit: scale-down;
      }
      mat-icon {
        position: absolute;
        z-index: 1000;
        opacity: 0;
      }
      a:hover {
        animation: all 0.5 ease;
      }
      a:hover > img {
        border: 4px solid white;
        transform: scale(1.1);
      }
      a:hover > mat-icon {
        opacity: 1;
      }
    `,
  ],
})
export class MostrarImagenComponent implements OnInit, OnChanges {
  @Input() width?: string = '20em';
  @Input() height?: string = '20em';
  @Input() filename: string;
  @Input() ocultarSiNoExiste: boolean;
  path = ''; // environment.urlApi;
  src: string;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filename && changes.filename.currentValue) {
      this.mostrarPath(this.filename);
    }
  }

  ngOnInit(): void {}
  mostrarPath(filename: string) {
    const archivo = JSON.parse(filename);
    if (Array.isArray(archivo)) {
      this.src = this.path + 'archivos/' + archivo[0].path;
    } else {
      this.src = this.path + 'archivos/' + archivo.path;
    }
  }
}
