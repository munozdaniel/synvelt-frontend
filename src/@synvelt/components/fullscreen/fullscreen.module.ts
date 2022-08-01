import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SynveltFullscreenComponent } from '@synvelt/components/fullscreen/fullscreen.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [SynveltFullscreenComponent],
    imports: [MatButtonModule, MatIconModule, MatTooltipModule, CommonModule],
    exports: [SynveltFullscreenComponent],
})
export class SynveltFullscreenModule {}
