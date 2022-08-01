import { NgModule } from '@angular/core';
import { SynveltScrollResetDirective } from '@synvelt/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [SynveltScrollResetDirective],
    exports: [SynveltScrollResetDirective],
})
export class SynveltScrollResetModule {}
