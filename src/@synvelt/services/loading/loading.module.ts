import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SynveltLoadingInterceptor } from '@synvelt/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SynveltLoadingInterceptor,
            multi: true,
        },
    ],
})
export class SynveltLoadingModule {}
