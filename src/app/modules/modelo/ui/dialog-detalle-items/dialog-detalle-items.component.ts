import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IModeloListaControl } from 'app/models/iModeloListaControl';

@Component({
  selector: 'app-dialog-detalle-items',
  templateUrl: './dialog-detalle-items.component.html',
  styleUrls: ['./dialog-detalle-items.component.scss'],
})
export class DialogDetalleItemsComponent implements OnInit {
  modelo: IModeloListaControl;
  constructor(
    public dialogRef: MatDialogRef<DialogDetalleItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if(data?.modelo){
        this.modelo = data.modelo;
    }
  }

  ngOnInit(): void {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
