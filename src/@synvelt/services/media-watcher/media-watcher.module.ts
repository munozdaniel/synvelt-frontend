import { NgModule } from '@angular/core';
import { SynveltMediaWatcherService } from '@synvelt/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [SynveltMediaWatcherService],
})
export class SynveltMediaWatcherModule {
    /**
     * Constructor
     */
    constructor(
        private _synveltMediaWatcherService: SynveltMediaWatcherService
    ) {}
}
