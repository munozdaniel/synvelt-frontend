import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SYNVELT_MOCK_API_DEFAULT_DELAY } from '@synvelt/lib/mock-api/mock-api.constants';
import { SynveltMockApiInterceptor } from '@synvelt/lib/mock-api/mock-api.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SynveltMockApiInterceptor,
            multi: true,
        },
    ],
})
export class SynveltMockApiModule {
    /**
     * SynveltMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(
        mockApiServices: any[],
        config?: { delay?: number }
    ): ModuleWithProviders<SynveltMockApiModule> {
        return {
            ngModule: SynveltMockApiModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    deps: [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi: true,
                },
                {
                    provide: SYNVELT_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0,
                },
            ],
        };
    }
}
