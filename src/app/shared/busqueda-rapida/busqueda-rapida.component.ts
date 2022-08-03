import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { designAnimations } from '@design/animations';

@Component({
  selector: 'app-busqueda-rapida',
  templateUrl: './busqueda-rapida.component.html',
  styleUrls: ['./busqueda-rapida.component.scss'],
  animations: [designAnimations],
})
export class BusquedaRapidaComponent implements OnInit {
  @Input() cargando: boolean;
  @Input() contador: number;
  @Output() retFiltroRapido = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  filtroRapido(filtro: string) {
    this.retFiltroRapido.emit(filtro);
  }
}
