import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SynveltAlertComponent } from '@synvelt/components/alert/alert.component';

@NgModule({
    declarations: [SynveltAlertComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule],
    exports: [SynveltAlertComponent],
})
export class SynveltAlertModule {}
