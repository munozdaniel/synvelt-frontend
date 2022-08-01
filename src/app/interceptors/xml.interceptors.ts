import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Inject } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { XmlParser } from '@angular/compiler';
import { XMLParser } from 'fast-xml-parser';

export class XmlInterceptor implements HttpInterceptor {
  constructor(@Inject(XmlParser) private xml: XMLParser) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // extend server response observable with logging
    return next.handle(req).pipe(
      // proceed when there is a response; ignore other events
      filter(event => event instanceof HttpResponse),
      map(
        (event: HttpResponse<any>) => {
          if (this.xml.parse(event.body) !== true) {
            // only parse xml response, pass all other responses to other interceptors
            return event;
          }

          // {responseType: text} expects a string response
          return event.clone({
            body: JSON.stringify(this.xml.parse(event.body)),
          });
        },
        // Operation failed; error is an HttpErrorResponse
        error => event
      )
    );
  }
}
