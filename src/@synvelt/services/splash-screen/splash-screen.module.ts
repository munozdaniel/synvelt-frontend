import { NgModule } from '@angular/core';
import { SynveltSplashScreenService } from '@synvelt/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [SynveltSplashScreenService],
})
export class SynveltSplashScreenModule {
    /**
     * Constructor
     */
    constructor(
        private _synveltSplashScreenService: SynveltSplashScreenService
    ) {}
}
