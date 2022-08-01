import { NgModule } from '@angular/core';
import { SynveltFindByKeyPipe } from '@synvelt/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [SynveltFindByKeyPipe],
    exports: [SynveltFindByKeyPipe],
})
export class SynveltFindByKeyPipeModule {}
