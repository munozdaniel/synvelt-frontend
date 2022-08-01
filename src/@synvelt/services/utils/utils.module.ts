import { NgModule } from '@angular/core';
import { SynveltUtilsService } from '@synvelt/services/utils/utils.service';

@NgModule({
    providers: [SynveltUtilsService],
})
export class SynveltUtilsModule {
    /**
     * Constructor
     */
    constructor(private _synveltUtilsService: SynveltUtilsService) {}
}
