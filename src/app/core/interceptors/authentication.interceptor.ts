import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private authenticationService: AuthenticationService, private router: Router, private cookieService: CookieService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('Authentication/Login') || req.url.includes('Authentication/Register'))
            return next.handle(req);

        let forgeryToken = this.cookieService.get('X-Forgery-Token');
        req.headers.append("X-Forgery-Token", forgeryToken);

        if (req.url.includes('Authentication/Refresh'))
            return next.handle(req);

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401)
                return from(this.handleUnauthenticatedError(req, next));

            return throwError(() => error);
        }));
    }

    private handleUnauthenticatedError(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(false);

            return this.authenticationService.RefreshToken().pipe(
                switchMap(() => {
                    this.isRefreshing = false;

                    this.refreshTokenSubject.next(true);

                    return next.handle(request);
                }),
                catchError((err) => {
                    this.isRefreshing = false;

                    if (err instanceof HttpErrorResponse && err.status === 401)
                        this.router.navigate(['']);

                    //redirect to login if already logged in. signalR to logout? (maybe not needed)

                    return throwError(() => err);
                })
            );
        }

        return this.refreshTokenSubject.pipe(
            filter(isReady => isReady),
            take(1),
            switchMap(() => next.handle(request))
        );
    }
}

export const AuthInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];