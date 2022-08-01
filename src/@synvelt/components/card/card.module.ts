import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynveltCardComponent } from '@synvelt/components/card/card.component';

@NgModule({
    declarations: [SynveltCardComponent],
    imports: [CommonModule],
    exports: [SynveltCardComponent],
})
export class SynveltCardModule {}
