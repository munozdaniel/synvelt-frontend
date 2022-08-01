import { ModuleWithProviders, NgModule } from '@angular/core';
import { SynveltConfigService } from '@synvelt/services/config/config.service';
import { SYNVELT_APP_CONFIG } from '@synvelt/services/config/config.constants';

@NgModule()
export class SynveltConfigModule {
    /**
     * Constructor
     */
    constructor(private _synveltConfigService: SynveltConfigService) {}

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<SynveltConfigModule> {
        return {
            ngModule: SynveltConfigModule,
            providers: [
                {
                    provide: SYNVELT_APP_CONFIG,
                    useValue: config,
                },
            ],
        };
    }
}
