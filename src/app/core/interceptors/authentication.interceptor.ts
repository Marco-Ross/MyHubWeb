import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpBackend } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //maybe if refresh dont intercept?

        let authReq = req;

        return next.handle(authReq).pipe(catchError(error => {
            this.refreshTokenSubject.next(null);

            if (error instanceof HttpErrorResponse && !authReq.url.includes('Authentication/Login') && error.status === 401) {
                return this.handle401Error(authReq, next);
            }

            return throwError(() => error);
        }));
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.RefreshToken().pipe(
                switchMap(_ => { //switch this to just map in testing to see if the refresh is the request it resolved. Essentially, the switch will change the refresh request to actually return the original request using the next.handle
                    this.isRefreshing = false;

                    return next.handle(request);
                }),
                catchError((err) => {
                    this.isRefreshing = false;

                    //this.tokenService.signOut();
                    return throwError(() => err);
                })
            );
        }

        return this.refreshTokenSubject.pipe(switchMap(_ => next.handle(request))); //not sure. but need to test this with a delay or something with two requests going.
    }
}

export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];