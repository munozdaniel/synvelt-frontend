import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SynveltLoadingBarComponent } from '@synvelt/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [SynveltLoadingBarComponent],
    imports: [CommonModule, MatProgressBarModule],
    exports: [SynveltLoadingBarComponent],
})
export class SynveltLoadingBarModule {}
