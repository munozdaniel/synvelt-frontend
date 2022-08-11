import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { XML2JsonInterceptorService } from 'app/interceptors/xml2json.interceptors';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthService,
    // {
    //     provide : HTTP_INTERCEPTORS,
    //     useClass: AuthInterceptor,
    //     multi   : true
    // }
    //  {
    //    provide: HTTP_INTERCEPTORS,
    //    useClass: XML2JsonInterceptorService,
    //    multi: true,
    //  },
  ],
})
export class AuthModule {}
