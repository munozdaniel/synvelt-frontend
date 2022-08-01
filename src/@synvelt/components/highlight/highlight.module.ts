import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynveltHighlightComponent } from '@synvelt/components/highlight/highlight.component';

@NgModule({
    declarations: [SynveltHighlightComponent],
    imports: [CommonModule],
    exports: [SynveltHighlightComponent],
})
export class SynveltHighlightModule {}
