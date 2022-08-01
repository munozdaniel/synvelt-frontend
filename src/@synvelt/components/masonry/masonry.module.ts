import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynveltMasonryComponent } from '@synvelt/components/masonry/masonry.component';

@NgModule({
    declarations: [SynveltMasonryComponent],
    imports: [CommonModule],
    exports: [SynveltMasonryComponent],
})
export class SynveltMasonryModule {}
