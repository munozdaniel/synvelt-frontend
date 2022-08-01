import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynveltDrawerComponent } from '@synvelt/components/drawer/drawer.component';

@NgModule({
    declarations: [SynveltDrawerComponent],
    imports: [CommonModule],
    exports: [SynveltDrawerComponent],
})
export class SynveltDrawerModule {}
