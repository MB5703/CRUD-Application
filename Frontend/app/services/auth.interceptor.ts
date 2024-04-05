import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenServiceService } from './token-service.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getBearerToken();
    if (token) {
      // Clone the request and add the Authorization header with the token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
