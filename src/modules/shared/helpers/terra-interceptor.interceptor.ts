import { AlertService } from './../services/alerts.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../guard/auth/auth.service';
import { StorageService } from '../services/storage.service';
import { EventbusService } from '../services/eventbus.service';
import { EventData } from '../class/event';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TerraRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventbusService,
    private cookieService: CookieService
    ) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log("outgoing request", req);
    // let item = localStorage.getItem("token_user_access") ? localStorage.getItem("token_user_access") : 'no_token';
    // let headers = new HttpHeaders()
    // headers.set("authorization", `Bearer ${item}`);
    // headers.set("refreshToken", this.cookieService.get('refreshToken') )
    // req = req.clone({ withCredentials: true, headers });
    // console.log("new outgoing request", req);
    // console.log("interceptor");
    return next.handle(req).pipe(
      catchError((error) => {

        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        } else if (error instanceof HttpErrorResponse && error.status === 403){
          this.eventBusService.emit(new EventData('logout', null));
        } if (error instanceof HttpErrorResponse && error.status === 400){
          this.eventBusService.emit(new EventData('logout', null));
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.eventBusService.emit(new EventData('logout', null));
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TerraRequestInterceptor, multi: true },
];
