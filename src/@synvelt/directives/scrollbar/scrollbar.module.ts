import { NgModule } from '@angular/core';
import { SynveltScrollbarDirective } from '@synvelt/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [SynveltScrollbarDirective],
    exports: [SynveltScrollbarDirective],
})
export class SynveltScrollbarModule {}
